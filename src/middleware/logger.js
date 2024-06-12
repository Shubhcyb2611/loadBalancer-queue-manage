import pino from "pino";
import fs from "fs";
import { LOG_LEVEL, LOG_PATH } from "../config/env.config.js";

const streams = [
  { stream: process.stdout }, //log to console
  { stream: fs.createWriteStream(LOG_PATH, { flags: "a" }) }, //writing all logs to the log file , "a" is for appending at the end
];

export const Logger = pino(
  {
    level: LOG_LEVEL,
  },
  pino.multistream(streams)
);
