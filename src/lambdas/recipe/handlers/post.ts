import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { ValidatedEventAPIGatewayProxyEvent } from "src/types";
import { formatJSONResponse } from "src/utils";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import createDynamoDBClient from "src/database";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const recipePostBodySchema = {
  type: "object",
  properties: {
    title: { type: "string" },
  },
  required: ["title"],
} as const;

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<typeof recipePostBodySchema> = async (event) => {
  const { body } = event;

  const dynamoDBClient = createDynamoDBClient();
  const command = new PutCommand({ TableName: "recipeTable", Item: body });

  await dynamoDBClient.send(command);

  return formatJSONResponse({
    message: `Created`,
  });
};

export const handler = middy().use(httpJsonBodyParser()).use(httpErrorHandler()).handler(lambdaHandler);
