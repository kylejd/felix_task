import { logger } from "./logger";
import httpErrorHandler from "@middy/http-error-handler";
import { ReasonPhrases } from "http-status-codes";

export const httpErrorHandlerConfigured = httpErrorHandler({
  logger: (error: any) => {
    logger.error(error);
  },
  fallbackMessage: JSON.stringify({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  }),
});
