//Generic function for handling route requests
export const routerRequest = async (req, res) => {
  const { type, speed } = req.params; //extractiong from request params

  setTimeout(
    () => {
      res.json({
        message: `${speed.toString().toUpperCase()} ${type
          .toString()
          .toUpperCase()} API response`,
      });
    },
    speed === "fast" ? 0 : 2000 //if speed if fast then no delay , else 2 seconds
  );
};
