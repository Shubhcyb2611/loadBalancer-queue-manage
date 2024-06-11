import express from "express";
import { Logger } from "./middleware/logger.js";
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    Logger.info(`Load Balancer Server is starting at http://localhost:${PORT}`);
});
