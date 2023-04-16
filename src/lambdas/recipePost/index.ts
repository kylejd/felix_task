import { handlerPath } from "src/utils";
import schema from "./eventSchema";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "recipe",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
