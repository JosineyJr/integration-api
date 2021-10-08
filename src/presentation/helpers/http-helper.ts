import { HttpResponse } from '@/presentation/protocols/http';
import { ServerError, UnauthorizedError } from '@/presentation/errors';

export const badRequest = (error: Error): HttpResponse => ({ body: error, statusCode: 400 });

export const forbidden = (error: Error): HttpResponse => ({ body: error, statusCode: 403 });

export const unauthorized = (): HttpResponse => ({
  body: new UnauthorizedError(),
  statusCode: 401,
});

export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack),
  statusCode: 500,
});

export const ok = (data: any): HttpResponse => ({ body: data, statusCode: 200 });

export const created = (data: any): HttpResponse => ({ body: data, statusCode: 201 });

export const noContent = (): HttpResponse => ({ body: null, statusCode: 204 });
