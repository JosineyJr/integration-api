export interface IHasher {
  hash: (plaintext: string) => Promise<string>;
}
