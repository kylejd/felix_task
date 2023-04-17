import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { ValidatedEventAPIGatewayProxyEvent } from "src/types";
import { formatJSONResponse } from "src/utils";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import createDynamoDBClient from "src/database";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { v4 as uuidv4 } from "uuid";

const recipePostBody = z.object({
  title: z.string(),
  steps: z.string(),
});
type RecipePostBody = z.infer<typeof recipePostBody>;
export const recipePostBodySchema = zodToJsonSchema(recipePostBody, "recipePostBodySchema");

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<RecipePostBody, {}> = async (event) => {
  const { body } = event;

  const dynamoDBClient = createDynamoDBClient();
  const command = new PutCommand({ TableName: "recipeTable", Item: { id: uuidv4(), ...body } });
  await dynamoDBClient.send(command);

  return formatJSONResponse({
    message: `Created`,
  });
};

export const handler = middy().use(httpJsonBodyParser()).use(httpErrorHandler()).handler(lambdaHandler);
