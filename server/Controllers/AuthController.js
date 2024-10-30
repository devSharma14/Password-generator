import User from "../models/user.model.js";
import createSecretToken from "../models/SecretToken.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body; 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" }); // Conflict status
        }

        const user = await User.create({ email, password, username });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
        });

        res.status(201).json({ message: "User signed up successfully", success: true, user });
    } catch (e) {
        console.error("Signup error:", e); 
        console.error(e.stack); 
        res.status(500).json({ message: "Internal server error" }); 
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User doesn't exist" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect email or password" });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { signup, login, logout };
