import prisma from "../db";
import { Request, Response } from "express";

// Get all products
export const getUpdates = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });
    if (!product) {
      res.status(404).json({ message: "Updates not found" });
      return;
    }
    const updates = product.map((product) => product.updates);

    res.json({ data: updates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single product
export const getOneUpdate = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        belongsToId: req.user.id,
        updates: {
          some: {
            id: req.params.id,
          },
        },
      },
      include: {
        updates: {
          where: {
            id: req.params.id,
          },
        },
      },
    });

    if (!product || !product.updates.length) {
      res
        .status(404)
        .json({ message: "Update not found or does not belong to the user" });
      return;
    }

    const update = product.updates[0];

    res.json({ data: update });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
// Create a product
export const createUpdate = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
        belongsToId: req.user.id,
      },
    });
    if (!product) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this product" });
      return null;
    }

    const newUpdate = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        product: {
          connect: { id: product.id },
        },
      },
    });
    res.json({ data: newUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a product
export const updateUpdate = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const updateOwner = await validateUpdateOwnership(req, res);
    if (!updateOwner) return;

    const updated = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json({ data: updated });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

// Delete a product
export const deleteUpdate = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const updateOwner = await validateUpdateOwnership(req, res);
    if (!updateOwner) return;

    await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Update deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateUpdateOwnership = async (
  req: Request & { user: any },
  res: Response
) => {
  const validUpdate = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      product: true,
    },
  });

  if (!validUpdate) {
    res.status(404).json({ message: "'Update' does not exist" });
    return null;
  }

  if (validUpdate.product.belongsToId !== req.user.id) {
    res.status(403).json({
      message: "You are not authorized to act on this product",
    });
    return null;
  }

  return validUpdate;
};
