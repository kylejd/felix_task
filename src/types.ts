import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S, Q> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
  queryStringParameters?: Q;
};

export type ValidatedEventAPIGatewayProxyEvent<S, Q> = Handler<
  ValidatedAPIGatewayProxyEvent<S, Q>,
  APIGatewayProxyResult
>;
