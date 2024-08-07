import { Router } from "express";
import { createNewUser } from "../handlers/user";

const router = Router();

router.post("/user", createNewUser);

export default router;
