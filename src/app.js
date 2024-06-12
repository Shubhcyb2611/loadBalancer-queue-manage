import express from "express";
import { Logger } from "./middleware/logger.js";
import genericRouter from "../src/routers/router-Request.js";
import { REST_PORT, GRAPHQL_PORT, GRPC_PORT } from "./config/env.config.js";
import { requestPayload, responsePayload } from "./middleware/payload.js";

const ports = {
  REST: REST_PORT,
  GraphQL: GRAPHQL_PORT,
  gRPC: GRPC_PORT,
};

//Loop to starting all three servers with their associated API types and ports
for (const [apiType, port] of Object.entries(ports)) {
  const app = express();
  app.use(express.json()); //parse json req body

  //for logging payload info
  app.use(requestPayload);
  app.use(responsePayload);

  app.use("/api", genericRouter);

  app.listen(port, () => {
    Logger.info(`${apiType} API server is running on port ${port}`);
  });
}
const loadBalancerApp = express();
loadBalancerApp.use(express.json());
loadBalancerApp.use("/api", genericRouter);
loadBalancerApp.listen(3000, () => {
  Logger.info(`Load balancer is running on port 3000`);
});
