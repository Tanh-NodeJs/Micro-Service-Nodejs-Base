const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require('dotenv').config()
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {ROUTES} = require("./routes");
const {setupAuth} = require("./auth");
const {setupLogging} = require("./logging");
// const {setupProxies} = require("./proxy");


// Create an instance of Express app
const app = express();
setupAuth(app, ROUTES);
setupLogging(app);
// setupProxies(app, ROUTES);
// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information




// Define port for Express server
const PORT = process.env.PORT || 5000;


// Start Express server
app.listen(PORT, () => {
 console.log(`Gateway is running on port ${PORT}`);
});
