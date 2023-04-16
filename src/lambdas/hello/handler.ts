import type { ValidatedEventAPIGatewayProxyEvent } from "@utils/api-gateway";
import { formatJSONResponse } from "@utils/api-gateway";
import { middyfy } from "@utils/lambda";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
