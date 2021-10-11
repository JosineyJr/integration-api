export const collectionsPedidosSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      data: {
        type: 'string',
      },
      totalvenda: {
        type: 'number',
      },
    },
  },
};
