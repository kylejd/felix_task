import { formatRoute, handlerPath } from "src/utils";
import { recipePostBodySchema } from "./handlers/post";

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
  pathRoute: "recipe",
  bodySchema: recipePostBodySchema,
});
