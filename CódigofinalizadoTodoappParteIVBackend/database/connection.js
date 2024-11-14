import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;
export const pool = new Pool({
  allowExitOnIdle: true,
});

async function connectDatabase() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
}

// Llama a la función para establecer la conexión
connectDatabase();
