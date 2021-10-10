export interface IEncrypter {
  encrypt: (plaintext: string, secret: string) => Promise<string>;
}
