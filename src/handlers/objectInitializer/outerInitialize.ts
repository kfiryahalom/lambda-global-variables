import { waitMs } from "~/utils/index";

/**
 * Initializes the database by simulating a delay and logging a message.
 *
 * @returns {string} A message indicating the database has been initialized.
 */
const initializeDb = (): string => {
  // Initialize the database
  waitMs(50);
  console.log("Database initialized");
  return "Database initialized";
};

/**
 * Object as Global variable
 */
const db = initializeDb();

/**
 Handles the inner singleton initialization process. Demonstrates initialization once on ColdStart.
 */
export const outerInitializeHandler = async (event: any) => {
  try {
    console.log(`db initialized: ${db}`);

    return "Success";
  } catch (error) {
    console.error(error, event);
    return "Error";
  }
};
