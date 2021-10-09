export interface IDecrypter {
  decrypt: (cipherText: string) => Promise<string>;
}
