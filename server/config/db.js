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
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
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

const connectPostgreSQL = async () => {
  try {
    // Log connection attempt with details (but hide credentials)
    console.log(
      `Attempting PostgreSQL connection to ${
        process.env.POSTGRES_HOST || "default host"
      }:${process.env.POSTGRES_PORT || "5432"} for database ${
        process.env.POSTGRES_DB || "default db"
      }`
    );

    await sequelize.authenticate();
    console.log("PostgreSQL database connected successfully");
    return true;
  } catch (error) {
    console.error(`PostgreSQL connection error: ${error.message}`);
    // Log more details about the connection attempt
    console.error(
      `Connection details: Host: ${
        process.env.POSTGRES_HOST || "not set"
      }, Port: ${process.env.POSTGRES_PORT || "not set"}, Database: ${
        process.env.POSTGRES_DB || "not set"
      }, User: ${process.env.POSTGRES_USER ? "set" : "not set"}`
    );
    throw error;
  }
};

module.exports = {
  connectMongoDB,
  connectPostgreSQL,
  sequelize,
};
