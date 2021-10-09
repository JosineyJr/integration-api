export class AccessDeniedError extends Error {
  constructor() {
    super('Access Denied');
    this.name = 'AccessDeniedError';
  }
}

export class ServerError extends Error {
  constructor(stack?: string) {
    super('Internal server error');
    this.name = 'ServerError';
    this.stack = stack;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}
