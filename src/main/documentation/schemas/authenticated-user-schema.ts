export const authenticatedUserSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  required: ['accessToken', 'name'],
};
