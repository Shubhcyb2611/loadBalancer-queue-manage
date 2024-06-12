export const requestPayload = async (req, res, next) => {
  let payloadSize = 0;
  let payloadType = "";
  if (req.body) {
    payloadSize = JSON.stringify(req.body).length;
    payloadType = req.headers["Content-type"];
  }
  console.log(`Payload Size: ${payloadSize} bytes`);
  console.log(`Payload Type: ${payloadType}`);

  next();
};
