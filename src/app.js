import express from "express";
const app = express();

const simulateDelay = (min, max) => (req, res, next) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  setTimeout(next, delay);
};

// REST API Endpoints
app.get("/api/rest/fast", simulateDelay(50, 100), (req, res) => {
  res.json({ message: "Fast REST response" });
});

app.get("/api/rest/slow", simulateDelay(2000, 5000), (req, res) => {
  res.json({ message: "Slow REST response" });
});

// GraphQL API Endpoints
app.get("/api/graphql/fast", simulateDelay(50, 100), (req, res) => {
  res.json({ data: { message: "Fast GraphQL response" } });
});

app.get("/api/graphql/slow", simulateDelay(200, 500), (req, res) => {
  res.json({ data: { message: "Slow GraphQL response" } });
});

// gRPC API Endpoints (simulated with HTTP)
app.get("/api/grpc/fast", simulateDelay(50, 100), (req, res) => {
  res.json({ message: "Fast gRPC response" });
});

app.get("/api/grpc/slow", simulateDelay(200, 500), (req, res) => {
  res.json({ message: "Slow gRPC response" });
});

app.listen(3000, () => {
  console.log("Server is  starting at http://localhost:3000");
});
