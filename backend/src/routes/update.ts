import { Router } from "express";

const router = Router();

//* Update Routes

router.get("/update", (req, res) => {
    return res.status(200).json({ message: " Get /update is working" });
});
router.post("/update", (req, res) => {
    return res.status(200).json({ message: " Post /update is working" });
});
router.get("/update/:id", (req, res) => {
    return res.status(200).json({ message: " Get /update/:id is working" });
});
router.put("/update/:id", (req, res) => {
    return res.status(200).json({ message: " Put /update/:id is working" });
});
router.delete("/update/:id", (req, res) => {
    return res.status(200).json({ message: " Delete /update/:id is working" });
});

export default router;
