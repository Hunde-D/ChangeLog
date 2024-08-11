import { Router } from "express";
import { signin } from "../handlers/user";

const router = Router();

router.post("/signin", signin);

export default router;
