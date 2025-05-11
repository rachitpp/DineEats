const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// PostgreSQL Connection with additional configuration
let sequelize;

// Determine if we're using a connection string or individual parameters
if (process.env.POSTGRES_URI) {
  console.log("Using PostgreSQL connection string from POSTGRES_URI");
  sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Important for connecting to hosted PostgreSQL services
      },
      connectTimeout: 60000, // Increase connection timeout
    },
    pool: {
      max: 5, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 60000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
    },
    retry: {
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /TimeoutError/,
        /ECONNRESET/,
      ],
      max: 5, // Maximum amount of tries
    },
  });
} else if (
  process.env.POSTGRES_DB &&
  process.env.POSTGRES_USER &&
  process.env.POSTGRES_PASSWORD &&
  process.env.POSTGRES_HOST
) {
  // Using individual connection parameters
  console.log("Using individual PostgreSQL connection parameters");

  const dbName = process.env.POSTGRES_DB;
  const username = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT || 5432;

  sequelize = new Sequelize(dbName, username, password, {
    host,
    port,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectTimeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  });
} else {
  console.error(
    "No PostgreSQL connection details provided. Please set POSTGRES_URI or individual connection parameters."
  );
}

const connectPostgreSQL = async () => {
  try {
    if (!sequelize) {
      throw new Error("PostgreSQL connection details are missing");
    }

    // Log connection attempt
    if (process.env.POSTGRES_URI) {
      console.log("Attempting PostgreSQL connection using connection string");
    } else {
      console.log(
        `Attempting PostgreSQL connection to ${
          process.env.POSTGRES_HOST || "default host"
        }:${process.env.POSTGRES_PORT || "5432"} for database ${
          process.env.POSTGRES_DB || "default db"
        }`
      );
    }

    await sequelize.authenticate();
    console.log("PostgreSQL database connected successfully");
    return true;
  } catch (error) {
    console.error(`PostgreSQL connection error: ${error.message}`);

    // Log connection details (sanitized)
    if (process.env.POSTGRES_URI) {
      const sanitizedUri = process.env.POSTGRES_URI.replace(
        /\/\/([^:]+):([^@]+)@/,
        "//[USERNAME]:[PASSWORD]@"
      );
      console.error(`Connection string (sanitized): ${sanitizedUri}`);
    } else {
      console.error(
        `Connection details: Host: ${
          process.env.POSTGRES_HOST || "not set"
        }, Port: ${process.env.POSTGRES_PORT || "not set"}, Database: ${
          process.env.POSTGRES_DB || "not set"
        }, User: ${process.env.POSTGRES_USER ? "set" : "not set"}`
      );
    }

    throw error;
  }
};

module.exports = {
  connectMongoDB,
  connectPostgreSQL,
  sequelize,
};
