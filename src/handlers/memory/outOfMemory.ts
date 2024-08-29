import { generateString } from "~/utils/stringUtil";

const configDict = new Map<string, any>();

/**
 * This is and Example of Wrong usage of Global Variable as a cache.
 *
 * Each run of this function will store new big size object in a GlobalVariable "configDict".
 *
 * Which will cause the memory increased after each run. until it reaches the memory limit. and we will get "out of memory" error.
 */
export const outOfMemoryHandler = async (event: any) => {
  try {
    console.log(`Input: ${event.configId}`);
    const input = event.configId;
    storeBigObjectsToGlobalVariable(input);
    console.log(`configDict size: ${configDict.size}`);
    return "success";
  } catch (error) {
    console.error(error, event);
    return "Error";
  }
};

const storeBigObjectsToGlobalVariable = (length: number) => {
  for (let i = 0; i < length; i++) {
    const ts = Date.now();
    const str = generateString(500);
    configDict.set(`${i}_${ts}`, { ts, str });
  }
};
