import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";
import config from "./config";

// Middleware function
// const myLogger = function (req, res, next) {
//   console.log("LOGGED");
//   next();
// };

// app.use(myLogger);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
