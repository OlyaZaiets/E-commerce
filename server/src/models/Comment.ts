import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const commentSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 800,
    },
    // на майбутнє: відповіді
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true }
);

// швидка вибірка коментів для продукту (останнє зверху)
commentSchema.index({ productId: 1, createdAt: -1 });

export type CommentDoc = InferSchemaType<typeof commentSchema>;
export default mongoose.model('Comment', commentSchema);
