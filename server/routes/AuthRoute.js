import express from "express";
import { signup, login } from "../Controllers/AuthController.js";
import userVerification from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/", userVerification);
router.get("/test", (req, res) => {
    return res.json({ message: "Signup route is working!" });
});

export default router;
