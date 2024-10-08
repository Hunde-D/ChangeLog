import prisma from "../db";
import { Request, Response, NextFunction } from "express";

// Get all products
export const getAllProducts = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ data: user.products });
  } catch (err) {
    err.type = "database";
    next(err);
  }
};

// Get a single product
export const getOneProduct = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ data: product });
    return;
  } catch (err) {
    err.type = "database";
    next(err);
  }
};
// Create a product
export const createProduct = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: newProduct });
  } catch (err) {
    err.type = "database";
    next(err);
  }
};

// Update a product

export const updateProduct = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.json({ data: product });
    return;
  } catch (err) {
    err.type = "auth";
    next(err);
  }
};

// Delete a product

export const deleteProduct = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });
    res.json({ message: "Product Deleted" });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
