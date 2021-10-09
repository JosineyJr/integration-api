export interface IValidator {
  validate: () => Error | undefined;
}

export interface IEmailValidator {
  isValid: (email: string) => boolean;
}
