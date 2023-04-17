export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
};

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const formatRoute = (props: {
  path: string;
  functionName: string;
  methodRoute: string;
  pathRoute: string;
  bodySchema?: {
    [k: string]: unknown;
  };
}) => {
  const { path, functionName, methodRoute, pathRoute, bodySchema } = props;

  return {
    handler: `${path}/handlers/${functionName}`,
    events: [
      {
        http: {
          method: methodRoute,
          path: pathRoute,

          request: {
            schemas: {
              "application/json": bodySchema,
            },
          },
        },
      },
    ],
  };
};
