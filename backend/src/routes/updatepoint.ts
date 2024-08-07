import { Router } from "express";

const router = Router();

//* Updatepoint Routes

router.get("/updatepoint", (req, res) => {
    return res.status(200).json({ message: " Get /updatepoint is working" });
    
});
router.post("/updatepoint", (req, res) => {
    return res.status(200).json({ message: " Post /updatepoint is working" });
});
router.get("/updatepoint/:id", (req, res) => {
    return res.status(200).json({ message: " Get /updatepoint/:id is working" });
});
router.put("/updatepoint/:id", (req, res) => {
    return res.status(200).json({ message: " Put /updatepoint/:id is working" });
});
router.delete("/updatepoint/:id", (req, res) => {
    return res.status(200).json({ message: " Delete /updatepoint/:id is working" });
});

export default router;
