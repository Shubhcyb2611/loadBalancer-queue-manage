import { Logger } from "./logger.js";

//Middleware func to log info abouth payload of incoming requests
export const requestPayload = async (req, res, next) => {
  let payloadSize = 0;
  let payloadType = "";

  if (req.body) {
    payloadSize = JSON.stringify(req.body).length; //calculate the payload size
    payloadType = req.headers["content-type"]; //extract from headers
  }
  Logger.info(`Request Payload Size: ${payloadSize} bytes`);
  Logger.info(`Request Payload Type: ${payloadType}`);

  //assignment for further process
  req.payloadSize = payloadSize;
  req.payloadType = payloadType;

  return next();
};

export const responsePayload = async (req, res, next) => {
  const originalSend = res.send; //store the original data

  //get the payload info from the response data
  res.send = (body) => {
    const payloadSize = Buffer.byteLength(body);
    const payloadType = res.get("Content-Type");

    Logger.info(`Response Payload Size: ${payloadSize} bytes`);
    Logger.info(`Response Payload Type: ${payloadType}`);

    res.send = originalSend; //restore  to the original one
    return res.send(body);
  };
  return next();
};
