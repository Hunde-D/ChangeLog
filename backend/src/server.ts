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
// Error Handler
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else if (err.type === "database") {
    res
      .status(500)
      .json({ message: "A database error occurred. Please try again later." });
  } else if (err.type === "validation") {
    res
      .status(422)
      .json({ message: "Data validation failed. Please check your input." });
  } else if (err.type === "not_found") {
    res.status(404).json({ message: "resource not found" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
