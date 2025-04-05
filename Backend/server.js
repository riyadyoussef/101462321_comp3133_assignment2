require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");

const app = express();

// ✅ Allow cross-origin requests
app.use(cors());

// ✅ Increase payload limit for JSON and URL-encoded bodies (up to 10MB or more)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    try {
      if (!req.body || !req.body.query) {
        return {}; // No authentication needed if no query is provided
      }

      // Extract operation name from the query string
      const operationNameMatch = req.body.query.match(/\b(mutation|query)\s+(\w+)/);
      const operationName = operationNameMatch ? operationNameMatch[2] : null;

      // Skip authentication for public routes
      const publicRoutes = ["signup", "login"];
      if (operationName && publicRoutes.includes(operationName)) {
        console.log(`🔓 Public route accessed: ${operationName}`);
        return {}; // No auth context needed
      }

      // 🔒 Apply auth middleware for protected routes
      authMiddleware(req);
      return { user: req.user };
    } catch (error) {
      console.error("❌ Authentication context error:", error.message);
      return {};
    }
  }
});

// Start the server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

// Run the server
startServer();
