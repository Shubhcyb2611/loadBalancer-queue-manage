import { Logger } from "./logger.js";

export const requestPayload = async (req, res, next) => {
  let payloadSize = 0;
  let payloadType = "";
  if (req.body) {
    payloadSize = JSON.stringify(req.body).length;
    payloadType = req.headers["content-type"];
  }
  Logger.info(`Request Payload Size: ${payloadSize} bytes`);
  Logger.info(`Request Payload Type: ${payloadType}`);

  req.payloadSize = payloadSize;
  req.payloadType = payloadType;

  return next();
};

export const responsePayload = async (req, res, next) => {
  const originalSend = res.send;

  res.send = (body) => {
    const payloadSize = Buffer.byteLength(body);
    const payloadType = res.get("Content-Type");
    Logger.info(`Response Payload Size: ${payloadSize} bytes`);
    Logger.info(`Response Payload Type: ${payloadType}`);
    res.send = originalSend;
    return res.send(body);
  };
  return next();
};
