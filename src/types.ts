import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<S, Q, U> = Omit<APIGatewayProxyEvent, "body"> & {
  body: S;
  queryStringParameters: Q;
  pathParameters: U;
};

export type ValidatedEventAPIGatewayProxyEvent<S, Q, U> = Handler<
  ValidatedAPIGatewayProxyEvent<S, Q, U>,
  APIGatewayProxyResult
>;
