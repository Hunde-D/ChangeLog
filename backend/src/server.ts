import express from "express";
import {
  productRoute,
  updateRoute,
  updatePointRoute,
  userRoute,
  signinRoute,
} from "./routes";
import { protect } from "./module/auth";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protected Routes
app.use("/api", protect, productRoute);
app.use("/api", protect, updateRoute);
app.use("/api", protect, updatePointRoute);

// Public Routes (Authentication Routes)
app.use("/", userRoute);
app.use("/", signinRoute);

export default app;
