import express from "express";
import { productRoute, updateRoute, updatePointRoute } from "./routes";


const app = express();
app.use("/api", productRoute);
app.use("/api", updateRoute);
app.use("/api", updatePointRoute);


export default app;
