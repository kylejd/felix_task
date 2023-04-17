import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<S, Q> = Omit<APIGatewayProxyEvent, "body"> & {
  body: S;
  queryStringParameters: Q;
};

export type ValidatedEventAPIGatewayProxyEvent<S, Q> = Handler<
  ValidatedAPIGatewayProxyEvent<S, Q>,
  APIGatewayProxyResult
>;
