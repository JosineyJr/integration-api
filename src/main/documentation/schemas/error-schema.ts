export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
    },
    statusCode: {
      type: 'number',
    },
  },
  required: ['error', 'statusCode'],
};
