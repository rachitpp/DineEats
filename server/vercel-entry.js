// Serverless function entry point for Vercel
const app = require("./server");

// For Vercel serverless functions, we need to export a handler function
module.exports = (req, res) => {
  // Make sure we don't call "listen"
  if (!app.serverless) {
    app.serverless = true;
  }

  // Forward the request to our Express app
  return app(req, res);
};
