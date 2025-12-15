export type UserRole = 'user' | 'admin';

export interface AuthPayload {
  id: string;
  role: UserRole;
}
