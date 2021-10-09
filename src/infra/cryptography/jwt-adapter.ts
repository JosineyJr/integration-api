import jwt from 'jsonwebtoken';
import { IDecrypter, IEncrypter } from '@/data/protocols';

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }

  async decrypt(cipherText: string): Promise<string> {
    return jwt.verify(cipherText, this.secret) as any;
  }
}
