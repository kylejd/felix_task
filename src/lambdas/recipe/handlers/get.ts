import { GetCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { StatusCodes } from "http-status-codes";
import { createDynamoDocumentClient } from "src/shared/database";
import { ValidatedEventAPIGatewayProxyEvent } from "src/shared/types";
import { formatJSONResponse } from "src/shared/utils";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const recipeGetPathParameters = z.object({
  id: z.string().uuid(),
});
type RecipeGetPathParameters = z.infer<typeof recipeGetPathParameters>;
export const recipeGetPathParametersSchema = zodToJsonSchema(recipeGetPathParameters, "recipeGetParamsSchema");

const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<{}, {}, RecipeGetPathParameters> = async (event) => {
  const { pathParameters } = event;
  console.log(pathParameters);
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

export const handler = middy().use(httpJsonBodyParser()).use(httpErrorHandler()).handler(lambdaHandler);
