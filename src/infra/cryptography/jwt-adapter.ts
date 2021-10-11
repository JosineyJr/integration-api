import jwt from 'jsonwebtoken';
import { IDecrypter, IEncrypter } from '@/data/protocols';

export class JwtAdapter implements IEncrypter, IDecrypter {
  async encrypt(payload: any, secret: string): Promise<string> {
    return jwt.sign({ id: payload.id, name: payload.name, email: payload.email }, secret);
  }

  async decrypt(cipherText: string, secret: string): Promise<any> {
    const payload = jwt.verify(cipherText, secret) as any;
    return payload;
  }
}
