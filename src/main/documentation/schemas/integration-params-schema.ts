export const integrationParamsSchema = {
  type: 'object',
  properties: {
    pipeDrive: {
      type: 'object',
      properties: {
        apiToken: {
          type: 'string',
        },
        companyDomain: {
          type: 'string',
        },
      },
    },
    bling: {
      type: 'object',
      properties: {
        apiKey: {
          type: 'string',
        },
      },
    },
  },
};
