import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";
import { PORT } from "./config";
import { dot } from "node:test/reporters";

// Middleware function
const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
