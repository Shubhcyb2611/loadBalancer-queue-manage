import express from "express";
import { Logger } from "./middleware/logger.js";
import genericRouter from "../src/routers/router-Request.js";
import { REST_PORT, GRAPHQL_PORT, GRPC_PORT } from "./config/env.config.js";
import { requestPayload } from "./middleware/payload.js";

const ports = {
  REST: REST_PORT,
  GraphQL: GRAPHQL_PORT,
  gRPC: GRPC_PORT,
};

for (const [apiType, port] of Object.entries(ports)) {
  const app = express();
  app.use(express.json());
  app.use(requestPayload);

  app.use("/api", genericRouter);

  app.listen(port, () => {
    Logger.info(`${apiType} API server is running on port ${port}`);
  });
}
