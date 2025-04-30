const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectMongoDB, connectPostgreSQL, sequelize } = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Add a request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the public directory
app.use("/static", express.static("public"));

// Track PostgreSQL connection status
let postgresConnected = false;

// Connect to databases
(async () => {
  try {
    // Try to connect to MongoDB
    await connectMongoDB();

    // Try to connect to PostgreSQL, but don't stop the server if it fails
    try {
      await connectPostgreSQL();
      postgresConnected = true;

      // Only sync Sequelize models if connection was successful
      try {
        await sequelize.sync({ alter: true });
        console.log("PostgreSQL database synced");
      } catch (syncError) {
        console.error("Error syncing PostgreSQL schema:", syncError);
      }
    } catch (pgError) {
      console.error(
        "PostgreSQL connection error - some features may be unavailable:",
        pgError
      );
    }

    // Routes - only register routes after database connection attempts
    app.use("/api/menu-items", require("./routes/menuItemRoutes"));

    // Only register order routes if PostgreSQL is available
    if (postgresConnected) {
      app.use("/api/orders", require("./routes/orderRoutes"));
    } else {
      // Fallback route for orders if PostgreSQL is not available
      app.use("/api/orders", (req, res) => {
        res.status(503).json({
          message:
            "Order functionality is temporarily unavailable. Please try again later.",
        });
      });
    }

    // Basic route for testing
    app.get("/", (req, res) => {
      res.json({
        message: "API is running...",
        mongoDBConnected: true,
        postgresConnected: postgresConnected,
      });
    });

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
})();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  // Log the error but don't exit process
});

// Export the app for serverless environments
module.exports = app;
