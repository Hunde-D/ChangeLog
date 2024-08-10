import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { handleError } from "../module/middleware";
import { get } from "http";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "../handlers/update";

const router = Router();

//* Update Routes

router.get("/update", getUpdates);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleError as any,
  createUpdate
);

router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED"]).optional(),
  handleError as any,
  updateUpdate
);
router.delete("/update/:id", deleteUpdate);

export default router;
