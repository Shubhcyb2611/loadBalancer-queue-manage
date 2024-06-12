export const requestPayload = async (req, res, next) => {
  let payloadSize = 0;
  let payloadType = "";
  if (req.body) {
    payloadSize = JSON.stringify(req.body).length;
    payloadType = req.headers["content-type"];
  }
  console.log(`Request Payload Size: ${payloadSize} bytes`);
  console.log(`Request Payload Type: ${payloadType}`);

  req.payloadSize = payloadSize;
  req.payloadType = payloadType;

  return next();
};

export const responsePayload = async (req, res, next) => {
  const originalSend = res.send;

  res.send = (body) => {
    const payloadSize = Buffer.byteLength(body);
    const payloadType = res.get("Content-Type");
      console.log(`Response Payload Size: ${payloadSize} bytes`);
      console.log(`Response Payload Type: ${payloadType}`);
    res.send = originalSend;
    return res.send(body);
  };
  return next();
};
