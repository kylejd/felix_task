# Kyle Davidson code challenge for Felix

This Project uses the Serverless framework to deploy 2 Lambdas to API Gateway. The Lambdas then read and write to a DynamoDB database.

## Features

- Body validation at the API Gateway level

- Query string and query parameter validation at the API Gateway level (it can only check if they exist or not)

- API key authentication

- Cloudwatch logging of all requests and responses

- Read and write capability to DynamoDB

- Can test with an offline instance of DynamoDB

- One command deployment to AWS

- Typed body, query string and query parameters when working in the Lambda handlers

## Offline Setup

1. Install the latest [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and setup the local permissions.

2. Run `pnpm install`

3. Ensure you have Java installed on the local path (needed for DynamoDB)

4. Run `pnpm install-offline`

5. Run `pnpm offline`

## Deployment

`pnpm sls deploy`

## Endpoints

##### GET /dev/recipe/{id}

---

##### POST /dev/recipe/

```typescript
{
    "title": string,
    "steps": string
}
```

## Headers

Note: The API key needs to be manually created though the AWS GUI due to some quirks I encountered with the framework.

| Header    | Value       |
| --------- | ----------- |
| x-api-key | {{api_key}} |
