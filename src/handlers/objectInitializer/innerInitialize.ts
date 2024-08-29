import { waitMs } from "~/utils/index";

/**
 * Initializes the database by simulating a delay and logging a message.
 *
 * @returns {string} A message indicating the database has been initialized.
 */
const initializeDb = (): string => {
  // "Initialize the database"
  waitMs(50);
  console.log("Database initialized");
  return "Database initialized";
};

/**
 * Handles the inner initialization process.
 * Demonstrates that each run initializes the database.
 */
export const innerInitializeHandler = async (event: any) => {
  try {
    console.log(`Hello, innerInitializeHandler test`);
    const db = initializeDb();
    console.log(`db initialized: ${db}`);

    return "Success";
  } catch (error) {
    console.error(error, event);
    return "Error";
  }
};
