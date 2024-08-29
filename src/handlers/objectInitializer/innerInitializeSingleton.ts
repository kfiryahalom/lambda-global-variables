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

let _db: string | undefined = undefined;

/**
 * Simulate "singleton" pattern by only initializing the database once
 */
const getDb = () => {
  if (!_db) {
    _db = initializeDb();
  }
  return _db;
};

/**
 *  Handles the inner singleton initialization process. Demonstrates initialization once on runtime.
 */
export const innerInitializeSingletonHandler = async (event: any) => {
  try {
    console.log(`Hello, innerInitializeSingletonHandler test`);
    const db = getDb();
    console.log(`db initialized: ${db}`);

    return "Success";
  } catch (error) {
    console.error(error, event);
    return "Error";
  }
};
