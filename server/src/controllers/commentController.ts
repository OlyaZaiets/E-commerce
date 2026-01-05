import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment';


const splitFullName = (fullName?: string) => {
  const value = String(fullName ?? '').trim();
  if (!value) return { firstName: '', lastName: '' };

  const parts = value.split(/\s+/);
  const firstName = parts[0] ?? '';
  const lastName = parts.slice(1).join(' ') ?? '';

  return { firstName, lastName };
};

const mapComment = (c: any) => {
  const u = c.userId;
  const { firstName, lastName } = splitFullName(u?.fullName);

  return {
    _id: c._id,
    productId: c.productId,
    text: c.text,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    user: u ? { _id: u._id, firstName, lastName } : null,
  };
};


export const getProductComments = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const limit = Math.min(Number(req.query.limit) || 20, 50);

    const comments = await Comment.find({ productId, parentId: null })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'fullName')
      .lean();

    const mapped = comments.map((c: any) => {
      const u = c.userId;
      const { firstName, lastName } = splitFullName(u?.fullName);

      return {
        _id: c._id,
        productId: c.productId,
        text: c.text,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        user: u
          ? {
              _id: u._id,
              firstName,
              lastName,
            }
          : null,
      };
    });

    res.json(mapped);
  } catch {
    res.status(500).json({ message: 'Failed to load comments' });
  }
};


export const createProductComment = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const text = String(req.body?.text ?? '').trim();
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    if (text.length > 800) {
      return res.status(400).json({ message: 'Comment is too long (max 800)' });
    }

    const userId = (req as any).user?.id || (req as any).user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const comment = await Comment.create({
      productId,
      userId,
      text,
    });

    const populated = await Comment.findById(comment._id)
      .populate('userId', 'fullName')
      .lean();

    const u = (populated as any)?.userId;
    const { firstName, lastName } = splitFullName(u?.fullName);

    res.status(201).json({
      _id: populated?._id,
      productId: populated?.productId,
      text: populated?.text,
      createdAt: populated?.createdAt,
      updatedAt: populated?.updatedAt,
      user: u
        ? {
            _id: u._id,
            firstName,
            lastName,
          }
        : null,
    });
  } catch {
    res.status(500).json({ message: 'Failed to create comment' });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID format' });
    }

    const text = String(req.body?.text ?? '').trim();
    if (!text) return res.status(400).json({ message: 'Comment text is required' });
    if (text.length > 800) return res.status(400).json({ message: 'Comment is too long (max 800)' });

    const userId = (req as any).user?.id || (req as any).user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // 🔒 only author
    if (String(comment.userId) !== String(userId)) {
      return res.status(403).json({ message: 'Forbidden: not your comment' });
    }

    comment.text = text;
    await comment.save();

    const populated = await Comment.findById(comment._id)
      .populate('userId', 'fullName')
      .lean();

    return res.json(mapComment(populated));
  } catch {
    return res.status(500).json({ message: 'Failed to update comment' });
  }
};


export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID format' });
    }

    const userId = (req as any).user?.id || (req as any).user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (String(comment.userId) !== String(userId)) {
      return res.status(403).json({ message: 'Forbidden: not your comment' });
    }

    await Comment.deleteOne({ _id: commentId });
    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: 'Failed to delete comment' });
  }
};
