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

// Track PostgreSQL connection status
let postgresConnected = false;
let mongoConnected = false;

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

// Setup database connections immediately but don't wait for them
// This allows serverless functions to start handling requests right away
const setupDatabases = async () => {
  try {
    // Try to connect to MongoDB
    await connectMongoDB();
    mongoConnected = true;
    console.log("MongoDB connected");

    // Try to connect to PostgreSQL, but don't stop the server if it fails
    try {
      await connectPostgreSQL();
      postgresConnected = true;
      console.log("PostgreSQL connected");

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
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
  }
};

// Start database setup in background
setupDatabases();

// Basic route for testing
app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    mongoDBConnected: mongoConnected,
    postgresConnected: postgresConnected,
  });
});

// API routes
app.use("/api/menu-items", require("./routes/menuItemRoutes"));

// Orders route - with fallback if PostgreSQL isn't available
if (postgresConnected) {
  // If PostgreSQL is connected, use the order routes
  app.use("/api/orders", require("./routes/orderRoutes"));
} else {
  // Fallback route for orders if PostgreSQL is not available
  app.use("/api/orders", (req, res) => {
    return res.status(503).json({
      message:
        "Order functionality is temporarily unavailable. Please try again later.",
    });
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Only start the server in traditional Node.js environments (not serverless)
const isVercel = process.env.VERCEL === "1";

if (!isVercel && process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  console.log("Running in serverless mode - no server.listen() called");
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  // Log the error but don't exit process
});

// Export the app for serverless environments
module.exports = app;
