import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { ValidatedEventAPIGatewayProxyEvent } from "src/types";
import { formatJSONResponse } from "src/utils";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import createDynamoDBClient from "src/database";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const recipeGetParams = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
} as const;

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<undefined, typeof recipeGetParams> = async (event) => {
  const { queryStringParameters } = event;

  const { id } = queryStringParameters;

  const dynamoDBClient = createDynamoDBClient();
  const command = new GetCommand({
    TableName: "recipeTable",
    Key: {
      primaryKey: id,
    },
  });

  const recipe = await dynamoDBClient.send(command);

  return formatJSONResponse({
    ...recipe.Item,
  });
};

export const handler = middy().use(httpJsonBodyParser()).use(httpErrorHandler()).handler(lambdaHandler);
