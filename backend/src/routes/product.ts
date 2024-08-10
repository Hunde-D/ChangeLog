import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleError } from "../module/middleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../handlers/product";

const router = Router();

//* Product Routes

router.get("/product", getAllProducts);
router.post(
  "/product",
  body("name").isString(),
  handleError as any,
  createProduct
);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleError as any,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

export default router;
