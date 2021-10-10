export interface IDecrypter {
  decrypt: (cipherText: string, secret: string) => Promise<string>;
}
