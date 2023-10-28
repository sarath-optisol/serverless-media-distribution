const schema = {
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    body: {
      type: "object",
      properties: {
        price: {
          type: "number",
        },
      },
      required: ["price"],
    },
  },
  type: "object",
  required: ["pathParameters"],
};

export default schema;
