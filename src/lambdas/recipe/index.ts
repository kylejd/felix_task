import { formatRoute, handlerPath } from "src/utils";
import { recipePostBody } from "./handlers/post";

export const createRecipe = formatRoute({
  path: handlerPath(__dirname),
  functionName: "post.handler",
  methodRoute: "post",
  pathRoute: "recipe",
  bodySchema: recipePostBody,
});
