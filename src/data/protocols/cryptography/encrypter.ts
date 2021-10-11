export interface IEncrypter {
  encrypt: (plaintext: any, secret: string) => Promise<string>;
}
