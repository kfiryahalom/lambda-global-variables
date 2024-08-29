import { logger } from "~/utils/logger";
import { waitMs } from "~/utils/index";
import { IConfigProps } from "~/handlers/configuration/types";
import NodeCache from "node-cache";

const _cache = new NodeCache({ stdTTL: 5 * 60 }); // save for 5 minutes

/**
 * Get configuration for a company and store to a Global Variable (uses as a cache)
 *
 * As some configs can be changed from time to time, for the example here, I also used the "NodeCase" Library to store the config for 5 minutes.
 */
export const getConfigHandler = async (event: any) => {
  try {
    logger.info(`Input`, event);
    const { companyId } = event;

    let config = _cache.get(companyId);
    if (!config) {
      _cache.set(
        companyId,
        await getConfigFrom_ssm_S3_db_or_anywhere_else(companyId),
      );
    } else {
      logger.info(`Config already exists for ${companyId}`, config);
    }

    return "success";
  } catch (error) {
    logger.error("Internal server error...", { error, event });
    return "Error";
  }
};

/**
 * Get configuration for a company
 *
 * (no matter what source it comes from, it can be from SSM, S3, DB, or anywhere else)
 *
 * This function is just a mock function that simulates the time it takes to get the configuration, for the demonstration I set it to long latency of 1 sec..
 * @param companyId
 * @returns
 */
const getConfigFrom_ssm_S3_db_or_anywhere_else = async (
  companyId: string,
): Promise<IConfigProps> => {
  waitMs(1000);
  logger.info(`Config initialized for ${companyId}`);
  return {
    access_key: `some_access_key__${companyId}`,
    secret_access_key: `some_secret_access_key__${companyId}`,
  };
};
