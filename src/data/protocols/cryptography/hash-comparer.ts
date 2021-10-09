export interface IHashComparer {
  compare: (plaintext: string, digest: string) => Promise<boolean>;
}
