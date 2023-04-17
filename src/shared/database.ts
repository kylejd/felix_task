import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const createDynamoDocumentClient = (): DynamoDBClient => {
  if (process.env.IS_OFFLINE) {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "localhost",
        endpoint: "http://localhost:5000",
      })
    );
  }

  return DynamoDBDocumentClient.from(new DynamoDBClient({}));
};
