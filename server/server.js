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
    origin: [
      process.env.FRONTEND_URL,
      "https://dine-eats.vercel.app",
      "https://dine-eats-1nsj.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the public directory
app.use("/static", express.static("public"));

// Handle favicon requests
app.get("/favicon.ico", (req, res) => {
  res.status(204).end(); // No content response
});

// Setup database connections immediately but don't wait for them
// This allows serverless functions to start handling requests right away
const setupDatabases = async () => {
  try {
    // Try to connect to MongoDB
    await connectMongoDB();
    mongoConnected = true;
    console.log("MongoDB connected");

    // Log database environment variables (without sensitive info)
    console.log("Checking PostgreSQL configuration...");
    if (process.env.POSTGRES_URI) {
      console.log("POSTGRES_URI is set");
    } else {
      console.log(
        `POSTGRES_HOST: ${process.env.POSTGRES_HOST ? "Set" : "Not set"}`
      );
      console.log(
        `POSTGRES_DB: ${process.env.POSTGRES_DB ? "Set" : "Not set"}`
      );
      console.log(
        `POSTGRES_USER: ${process.env.POSTGRES_USER ? "Set" : "Not set"}`
      );
      console.log(
        `POSTGRES_PASSWORD: ${
          process.env.POSTGRES_PASSWORD ? "Set but not shown" : "Not set"
        }`
      );
      console.log(
        `POSTGRES_PORT: ${
          process.env.POSTGRES_PORT || "Not set (will use default 5432)"
        }`
      );
    }

    // Try to connect to PostgreSQL, but don't stop the server if it fails
    try {
      await connectPostgreSQL();
      postgresConnected = true;
      console.log("PostgreSQL connected");

      // Only sync Sequelize models if connection was successful
      try {
        await sequelize.sync({ alter: true });
        console.log("PostgreSQL database synced");

        // Try to update order routes to use the actual implementation
        try {
          updateOrderRoutes();
        } catch (routeError) {
          console.log(
            "Could not update routes dynamically, but database is connected"
          );
        }
      } catch (syncError) {
        console.error("Error syncing PostgreSQL schema:", syncError);
      }
    } catch (pgError) {
      console.error(
        "PostgreSQL connection error - some features may be unavailable:",
        pgError.message
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

// Database status check endpoint
app.get("/api/status", (req, res) => {
  res.json({
    time: new Date().toISOString(),
    mongodb: {
      connected: mongoConnected,
    },
    postgres: {
      connected: postgresConnected,
      // Only add configuration checks if not connected
      config: !postgresConnected
        ? {
            uriProvided: !!process.env.POSTGRES_URI,
            hostProvided: !!process.env.POSTGRES_HOST,
            dbProvided: !!process.env.POSTGRES_DB,
            userProvided: !!process.env.POSTGRES_USER,
            passwordProvided: !!process.env.POSTGRES_PASSWORD,
          }
        : undefined,
    },
  });
});

// Debug route for orders
app.get("/api/orders-debug", (req, res) => {
  res.json({
    postgresConnected,
    message: postgresConnected
      ? "PostgreSQL is connected, orders should be working"
      : "PostgreSQL is not connected, orders are unavailable",
  });
});

// API routes
app.use("/api/menu-items", require("./routes/menuItemRoutes"));

// Create a function that returns the appropriate order router based on connection status
const getOrderRouter = () => {
  // Create a new router
  const router = express.Router();

  if (postgresConnected) {
    console.log("PostgreSQL connected - using actual order routes");
    // If PostgreSQL is connected, use the real order routes
    // Import the order routes
    const orderRoutes = require("./routes/orderRoutes");

    // Forward all routes to the imported router
    router.use("/", orderRoutes);
  } else {
    console.log("PostgreSQL not connected - using fallback order routes");
    // Fallback route for all order endpoints
    router.all("*", (req, res) => {
      return res.status(503).json({
        message:
          "Order functionality is temporarily unavailable. Please try again later.",
      });
    });
  }

  return router;
};

// Function to update order routes when PostgreSQL connects
const updateOrderRoutes = () => {
  try {
    // Remove the current order routes
    app._router.stack = app._router.stack.filter((layer) => {
      if (!layer.route && layer.handle && layer.handle.name === "router") {
        // Check if this layer is the /api/orders router
        const path = layer.regexp.toString();
        return !path.includes("/api/orders");
      }
      return true;
    });

    // Add the new order routes
    app.use("/api/orders", getOrderRouter());
    console.log("Order routes updated successfully");
  } catch (error) {
    console.log("Could not update order routes dynamically:", error.message);
    console.log(
      "This is not a critical error - new connections will use the correct routes"
    );
  }
};

// Set up the order routes
app.use("/api/orders", getOrderRouter());

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
