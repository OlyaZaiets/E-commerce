export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}


export interface LoginPayload {
  email: string;
  password: string;
}
