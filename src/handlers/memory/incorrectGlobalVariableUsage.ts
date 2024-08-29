import { z } from "zod";
import winston from "winston";

const InputSchema = z.object({
  companyName: z.string(),
  userEmail: z.string().email(),
});
type IInputEvent = z.infer<typeof InputSchema>;

// did export the logger for better testing viewing
export const _logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

/**
 * This function is an example of incorrect usage of global variables.
 *
 * The global variable _logger is used to log the company name in the logs. But in case of validation error, the global variable _logger will contain the company name from the previous request.
 * @param event
 */
export const incorrectGlobalVariableUsageHandler = async (event: any) => {
  try {
    const input: IInputEvent = InputSchema.parse(event);
    const companyName = input.companyName;

    // SETTING LOGGER DEFAULT META SO EACH LOG WILL CONTAIN THE COMPANY NAME
    _logger.defaultMeta = { ..._logger.defaultMeta, companyName };
    _logger.info(`Input`, event);

    // DO SOME WORK HERE...

    return "success";
  } catch (error) {
    // IN CASE OF VALIDATION ERROR, WE WILL GET THE COMPANY NAME FOR THE PREVIOUS REQUEST IN THE LOGGER METADATA
    _logger.error("Internal server error...", { error, event });
    return "Error";
  }
};
