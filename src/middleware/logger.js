import pino from "pino";

import fs from "fs";
import { LOG_LEVEL, LOG_PATH } from "../config/env.config.js";

const streams = [
  { stream: process.stdout },
  { stream: fs.createWriteStream(LOG_PATH, { flags: "a" }) },
];

export const Logger = pino(
  {
    level: LOG_LEVEL,
    
  },
  pino.multistream(streams)
);
