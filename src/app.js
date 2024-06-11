import express from "express";
import { Logger } from "./middleware/logger.js";
const app = express();

app.listen(3000, () => {
  Logger.info("Server is  starting at http://localhost:3000");
});
