export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    const message = fieldName === undefined ? 'Field required' : `The field ${fieldName} is required`;
    super(message);
    this.name = 'RequiredFieldError';
  }
}

export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
  }
}

export class EmailInUseError extends Error {
  constructor() {
    super('The received email is already in use');
    this.name = 'EmailInUseError';
  }
}
