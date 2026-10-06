import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import connect from "./index.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authorisation from "./middleware/authorisation.js"
import todoRoute from "./routes/todoRoutes.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum 100 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes."
    }
});

// Login rate limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Maximum 10 login requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});

app.use("/api/users", userRoute);
app.use("/api/login", loginLimiter);
app.use("/api/login", loginRoute);
app.use("/api/todo", authMiddleware, todoRoute);
app.get("/", (req, res) => {
    res.json({
        message: "Backend is connected"
    });
});

app.listen(PORT, async () => {
    console.log(`Connected successfully on port ${PORT}`);

    try {
        await connect();
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
});