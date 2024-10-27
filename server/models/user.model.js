import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now for default
    },
});

// Hashing the password before saving
userSchema.pre("save", async function () {
    if(this.isModified("password")) { 
        this.password = await bcrypt.hash(this.password, 12);
    }
});

export default mongoose.model("User", userSchema);
