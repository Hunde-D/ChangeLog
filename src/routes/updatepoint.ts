import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleError } from "../module/middleware"; // Import

const router = Router();

//* Updatepoint Routes

router.get("/updatepoint", (req, res) => {
  res.status(200).json({ message: " Get /updatepoint is working" });
  return;
});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleError as any,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array });
      return;
    }
    res.status(200).json({ message: " Post /updatepoint is working" });
    return;
  }
);
router.get("/updatepoint/:id", (req, res) => {
  res.status(200).json({ message: " Get /updatepoint/:id is working" });
  return;
});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleError as any,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array });
      return;
    }
    res.status(200).json({ message: " Put /updatepoint/:id is working" });
    return;
  }
);
router.delete("/updatepoint/:id", (req, res) => {
  res.status(200).json({ message: " Delete /updatepoint/:id is working" });
  return;
});

export default router;
