import { GetCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { StatusCodes } from "http-status-codes";
import { createDynamoDocumentClient } from "src/shared/database";
import { httpErrorHandlerConfigured, inputOutputLoggerConfigured } from "src/shared/middleware";
import { ValidatedEventAPIGatewayProxyEvent } from "src/shared/types";
import { formatJSONResponse } from "src/shared/utils";
import { z } from "zod";

export const recipeGetPathParameters = z.object({
  id: z.string().uuid(),
});

export type RecipeGetPathParameters = z.infer<typeof recipeGetPathParameters>;

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<{}, {}, RecipeGetPathParameters> = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters;

  const dynamoDBClient = createDynamoDocumentClient();
  const command = new GetCommand({
    TableName: "recipeTable",
    Key: {
      id: id,
    },
  });

  const data = await dynamoDBClient.send(command);

  if (!data.Item) {
    return formatJSONResponse({
      statusCode: StatusCodes.NOT_FOUND,
    });
  }

  return formatJSONResponse({
    response: data.Item,
  });
};

export const handler = middy()
  .use(httpJsonBodyParser())
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandlerConfigured)
  .handler(lambdaHandler);
