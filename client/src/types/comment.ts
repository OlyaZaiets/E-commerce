export type CommentUser = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type Comment = {
  _id: string;
  productId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser | null;
};
