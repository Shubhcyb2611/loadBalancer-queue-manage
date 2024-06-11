import express from "express";
import { Logger } from "./middleware/logger.js";
import genericRouter from "../src/routers/router-Request.js";

const app = express();

app.use("/api", genericRouter);

const PORT = 3000;

app.listen(PORT, () => {
  Logger.info(`Load Balancer Server is starting at http://localhost:${PORT}`);
});
