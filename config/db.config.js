require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user:process.env.db_username,
  host:process.env.host,
  database:process.env.database,
  password:process.env.password,
  port: 25060,
  ssl: {rejectUnauthorized: false,},
});

const dbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL database successfully!");
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

module.exports = {dbConnection,pool};
