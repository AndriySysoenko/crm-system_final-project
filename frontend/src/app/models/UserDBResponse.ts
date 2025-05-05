
export type UserDBResponse = {
  id: string;
  email: string;
  name: string;
  surname: string;
  is_active: boolean;
  role: string;
  last_login?: Date | null | undefined;
  createdAt?: Date;
}