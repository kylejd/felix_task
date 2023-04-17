import { logger } from "./logger";
import httpErrorHandler from "@middy/http-error-handler";
import inputOutputLogger from "@middy/input-output-logger";
import { ReasonPhrases } from "http-status-codes";

export const httpErrorHandlerConfigured = httpErrorHandler({
  logger: (error: any) => {
    logger.error(error);
  },
  fallbackMessage: JSON.stringify({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  }),
});

export const inputOutputLoggerConfigured = () =>
  inputOutputLogger({
    logger: (request: any) => {
      const log = request.event ?? request.response;
      logger.info(typeof log === "string" ? log : JSON.stringify(log));
    },
  });
