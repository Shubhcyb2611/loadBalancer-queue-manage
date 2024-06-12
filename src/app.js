import express from "express";
import { Logger } from "./middleware/logger.js";
import genericRouter from "../src/routers/router-Request.js";
import {
  REST_PORT,
  GRAPHQL_PORT,
  GRPC_PORT,
  LOADBALANCER_PORT,
} from "./config/env.config.js";
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

  // Start the server on the specific port for API type
  app.listen(port, () => {
    Logger.info(`${apiType} API server is running on port ${port}`);
  });
}
const loadBalancerApp = express();
loadBalancerApp.use(express.json());
loadBalancerApp.use("/api", genericRouter);

//Start the load balancer server on its port
loadBalancerApp.listen(LOADBALANCER_PORT, () => {
  Logger.info(`Load balancer server is running on port ${LOADBALANCER_PORT}`);
});
