import { Role } from './role';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
