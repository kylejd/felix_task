import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import eventSchema from "./eventSchema";
import { ValidatedEventAPIGatewayProxyEvent } from "src/types";
import { formatJSONResponse } from "src/utils";
import { transpileSchema } from "@middy/validator/transpile";
import httpJsonBodyParser from "@middy/http-json-body-parser";

type EventType = ValidatedEventAPIGatewayProxyEvent<typeof eventSchema>;

const lambdaHandler: EventType = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
  });
};

export const handler = middy()
  .use(httpJsonBodyParser())
  .use(
    validator({
      eventSchema: transpileSchema(eventSchema),
    })
  )
  .use(httpErrorHandler())
  .handler(lambdaHandler);
