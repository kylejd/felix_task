import type { AWS } from "@serverless/typescript";
import { createRecipe } from "src/lambdas/recipe";

const serverlessConfiguration: AWS = {
  service: "felix-task",
  frameworkVersion: "3",
  functions: { createRecipe },
  plugins: ["serverless-esbuild", "serverless-offline", "serverless-dynamodb-local"],
  provider: {
    name: "aws",
    region: "ap-southeast-2",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
        ],
        Resource: "arn:aws:dynamodb:ap-southeast-2:*:table/*",
      },
    ],
  },
  resources: {
    Resources: {
      recipeTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "recipeTable",
          AttributeDefinitions: [
            {
              AttributeName: "title",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "title",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 5000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },
  },
};

module.exports = serverlessConfiguration;
