import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
};

export const formatJSONResponse = (props: { response?: Record<string, unknown>; statusCode?: number }) => {
  const { statusCode = StatusCodes.OK } = props;
  const { response = { message: getReasonPhrase(statusCode) } } = props;

  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

export const formatRoute = (props: {
  path: string;
  functionName: string;
  methodRoute: string;
  pathRoute: string;
  bodySchema?: any; // json schema
  queryStringSchema?: any; // json schema
  pathParametersSchema?: any; // json schema
}) => {
  const {
    path,
    functionName,
    methodRoute,
    pathRoute,
    bodySchema = {},
    queryStringSchema = {},
    pathParametersSchema = {},
  } = props;

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

            parameters: { querystrings: queryStringSchema, paths: pathParametersSchema },
          },
        },
      },
    ],
  };
};
