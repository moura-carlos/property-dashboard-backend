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
    connection: {
      connectionString: process.env.DATABASE_URL, // Use Render's DATABASE_URL (same variable name) for production
      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
};
