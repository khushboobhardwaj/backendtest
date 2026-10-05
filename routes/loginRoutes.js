import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required fields"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
const token = jwt.sign(
  {
    userId: user.id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
        
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
 
        
        
        // Login successful
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server error during login"
        });
    }
});

export default router;