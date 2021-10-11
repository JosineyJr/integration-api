import jwt from 'jsonwebtoken';
import { IDecrypter, IEncrypter } from '@/data/protocols';

export class JwtAdapter implements IEncrypter, IDecrypter {
  async encrypt(plaintext: string, secret: string): Promise<string> {
    return jwt.sign({ id: plaintext }, secret);
  }

  async decrypt(cipherText: string, secret: string): Promise<string> {
    const payload = jwt.verify(cipherText, secret) as any
    return payload.id;
  }
}
