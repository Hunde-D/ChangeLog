import prisma from "../db";
import { createJWT, hashPassword, comparePassword } from "../module/auth";

export const createNewUser = async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// authenticate user
export const signin = async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }

    const match = await comparePassword(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }

    const token = createJWT(user);
    res.status(200).json({ status: "Signin Successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
