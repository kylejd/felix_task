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
  queryStrings?: string[];
  pathParameters?: string[];
}) => {
  const { path, functionName, methodRoute, pathRoute, bodySchema, queryStrings = [], pathParameters = [] } = props;

  // API gateway can only validate if these properties exist
  const queryStringsFormatted = queryStrings.reduce((obj, item) => ({ ...obj, [item]: true }), {});
  const pathParametersFormatted = pathParameters.reduce((obj, item) => ({ ...obj, [item]: true }), {});

  return {
    handler: `${path}/handlers/${functionName}`,
    events: [
      {
        http: {
          method: methodRoute,
          path: pathRoute,

          request: {
            schemas: bodySchema
              ? {
                  "application/json": bodySchema,
                }
              : undefined,

            parameters: { querystrings: queryStringsFormatted, paths: pathParametersFormatted },
          },
        },
      },
    ],
  };
};
