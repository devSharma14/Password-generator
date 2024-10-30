import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/AuthRoute.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Removed trailing slash '/' imp point to be noted
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    credentials: true,
}));


app.use(cookieParser()); 
app.use(express.json()); 

app.get("/", (req, res) => {
    return res.json("default page working");
});

app.use("/auth", authRoute); 

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // Start the server
        app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
    })
    .catch((error) => console.log(error.message));
