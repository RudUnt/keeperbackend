import pg from "pg";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, "../../.env"); // Adjust the path as needed

// Load the environment variables
dotenv.config({ path: envPath });

const db = new pg.Client({
  connectionString: process.env.POSTGRES_URL_URL,
});

export default db;
