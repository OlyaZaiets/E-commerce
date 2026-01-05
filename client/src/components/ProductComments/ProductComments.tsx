import { useEffect, useMemo, useState } from 'react';
import './ProductComments.scss';
import { createComment, deleteComment, getCommentsByProductId, updateComment } from '../../api/comments';
import type { Comment } from '../../types/comment';
import { useAuth } from '../../context/useAuth';

type Props = {
  productId: string;
};

export const ProductComments = ({ productId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);

const { isLoggedInUser, user } = useAuth();

const [editingId, setEditingId] = useState<string | null>(null);
const [editText, setEditText] = useState('');

const currentUserId = user?._id;
const isMine = (c: Comment) => currentUserId && c.user?._id === currentUserId;



  useEffect(() => {
    setLoading(true);
    getCommentsByProductId(productId)
      .then(setComments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  const trimmed = useMemo(() => text.trim(), [text]);
  const count = useMemo(() => trimmed.length, [trimmed]);
  const canPost = isLoggedInUser && !!trimmed && !posting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;

    try {
      setPosting(true);
      const created = await createComment(productId, trimmed);
      setComments((prev) => [created, ...prev]);
      setText('');
    } catch (err: any) {
      alert(err.message || 'Failed to post comment');
    } finally {
      setPosting(false);
    }
  };


  const formatUserName = (user: Comment['user']) => {
    if (!user) return 'Unknown';

    const first = user.firstName?.trim();
    const last = user.lastName?.trim();

    if (!first) return 'Unknown';
    if (!last) return first;

    return `${first} ${last[0].toUpperCase()}.`;
  };


  return (
    <section className="comments">
      <div className="comments__header">
        <h3 className="comments__title">Comments</h3>
        {!loading && (
          <span className="comments__count">{comments.length}</span>
        )}
      </div>

      {/* Empty state (показуємо коли коментарів нема) */}
      {!loading && comments.length === 0 && (
        <div className="comments__empty">
          <div className="comments__emptyIcon" aria-hidden="true">
            💬
          </div>
          <p className="comments__emptyTitle">No comments yet</p>
          <p className="comments__emptyText">
            This is a quiet place — feel free to start the conversation.
          </p>
        </div>
      )}

      {/* Form */}
      {isLoggedInUser ? (
        <form className="comments__form" onSubmit={handleSubmit}>
          <label className="comments__label" htmlFor="comment">
            Write a comment
          </label>

          <textarea
            id="comment"
            className="comments__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts about this product…"
            maxLength={800}
          />

          <div className="comments__actions">
            <span className="comments__counter">{count}/800</span>

            <button
              type="submit"
              className="comments__postBtn"
              disabled={!canPost}
            >
              {posting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </form>
      ) : (
        <div className="comments__loginHint">
          <p className="comments__loginText">
            Log in to leave a comment.
          </p>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="comments__loading">Loading comments…</p>
      ) : comments.length > 0 ? (
        <ul className="comments__list">
          {comments.map((c) => (
            <li key={c._id} className="comments__item">
              <div className="comments__meta">
                <b className="comments__author">{formatUserName(c.user)}</b>

                <div className="comments__metaRight">
                  <span className="comments__date">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>

                  {isMine(c) && (
                    <div className="comments__menu">
                      <button
                        type="button"
                        className="comments__iconBtn"
                        onClick={() => {
                          setEditingId(c._id);
                          setEditText(c.text);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="comments__iconBtn comments__iconBtn--danger"
                        onClick={async () => {
                          if (!confirm('Delete this comment?')) return;
                          try {
                            await deleteComment(c._id);
                            setComments((prev) => prev.filter((x) => x._id !== c._id));
                          } catch (e: any) {
                            alert(e.message || 'Failed to delete comment');
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {editingId === c._id ? (
                <div className="comments__edit">
                  <textarea
                    className="comments__textarea"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    maxLength={800}
                  />

                  <div className="comments__actions">
                    <span className="comments__counter">{editText.trim().length}/800</span>

                    <div className="comments__editBtns">
                      <button
                        type="button"
                        className="comments__postBtn"
                        disabled={!editText.trim()}
                        onClick={async () => {
                          try {
                            const updated = await updateComment(c._id, editText.trim());
                            setComments((prev) => prev.map((x) => (x._id === c._id ? updated : x)));
                            setEditingId(null);
                          } catch (e: any) {
                            alert(e.message || 'Failed to update comment');
                          }
                        }}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="comments__ghostBtn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="comments__text">{c.text}</p>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};
