import { recipeGetPathParameters } from "./handlers/get";
import { recipePostBodySchema } from "./handlers/post";
import { formatRoute, handlerPath } from "src/shared/utils";

export const createRecipe = formatRoute({
  path: handlerPath(__dirname),
  functionName: "post.handler",
  methodRoute: "post",
  pathRoute: "recipe",
  bodySchema: recipePostBodySchema,
});

export const getRecipe = formatRoute({
  path: handlerPath(__dirname),
  functionName: "get.handler",
  methodRoute: "get",
  pathRoute: "recipe/{id}",
  pathParameters: Object.keys(recipeGetPathParameters.shape), // get the string values of the strings,
});
