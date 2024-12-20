require("dotenv").config(); // Load environment variables from .env

module.exports = {
  development: {
    client: "pg", // PostgreSQL client
    connection: process.env.DATABASE_URL, // Use DATABASE_URL directly,
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // Use DATABASE_URL (same variable) for production
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
