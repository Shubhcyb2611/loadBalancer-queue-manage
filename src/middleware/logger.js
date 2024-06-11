import pino from "pino";

const streams = [{ stream: process.stdout }];

export const Logger = pino({ level: "info" }, pino.multistream(streams));
