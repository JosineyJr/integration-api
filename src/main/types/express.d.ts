import { IUser } from '@/domain/models/user';

/* eslint-disable @typescript-eslint/naming-convention */
declare module Express {
  interface Request {
    user?: IUser;
  }
}
