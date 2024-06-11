export const routerRequest = async (req, res) => {
  const { type, speed } = req.params;

  setTimeout(
    () => {
      res.json({
        message: `${speed.toString().toUpperCase()} _
      ${type.toString().toUpperCase()} API response`,
      });
    },
    speed === "fast" ? 0 : 2000
  );
};
