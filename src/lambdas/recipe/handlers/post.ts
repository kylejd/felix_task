import { PutCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { StatusCodes } from "http-status-codes";
import { createDynamoDocumentClient } from "src/shared/database";
import { httpErrorHandlerConfigured } from "src/shared/middleware";
import { ValidatedEventAPIGatewayProxyEvent } from "src/shared/types";
import { formatJSONResponse } from "src/shared/utils";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const recipePostBody = z.object({
  title: z.string(),
  steps: z.string(),
});
type RecipePostBody = z.infer<typeof recipePostBody>;
export const recipePostBodySchema = zodToJsonSchema(recipePostBody, "recipePostBodySchema");

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<RecipePostBody, {}, {}> = async (event) => {
  const { body } = event;

  const payload = { id: uuidv4(), ...body };

  const dynamoDBClient = createDynamoDocumentClient();
  const command = new PutCommand({
    TableName: "recipeTable",
    Item: payload,
  });
  await dynamoDBClient.send(command);

  throw new Error("Required");

  return formatJSONResponse({
    response: payload,
    statusCode: StatusCodes.CREATED,
  });
};

export const handler = middy().use(httpJsonBodyParser()).use(httpErrorHandlerConfigured).handler(lambdaHandler);
