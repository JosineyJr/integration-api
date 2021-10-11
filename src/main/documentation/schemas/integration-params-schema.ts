export const integrationParamsSchema = {
  type: 'object',
  properties: {
    pipeDrive: {
      type: 'object',
      properties: {
        apiToken: {
          type: 'string',
          required: false,
        },
        companyDomain: {
          type: 'string',
          required: false,
        },
      },
    },
    bling: {
      type: 'object',
      properties: {
        apiKey: {
          type: 'string',
          required: false,
        },
      },
    },
  },
};
