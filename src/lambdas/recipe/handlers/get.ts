import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { ValidatedEventAPIGatewayProxyEvent } from "src/types";
import { formatJSONResponse } from "src/utils";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import createDynamoDBClient from "src/database";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const recipeGetParams = z.object({
  id: z.string().uuid(),
});
type RecipeGetParams = z.infer<typeof recipeGetParams>;
export const recipeGetParamsSchema = zodToJsonSchema(recipeGetParams, "recipeGetParamsSchema");

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<{}, RecipeGetParams> = async (event) => {
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
