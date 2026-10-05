import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

const router = express.Router();
router.post("/register", async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "name and email and password is required field"
            })
        }
        if (password.length < 6){
             return res.status(400).json({
                message: "Please Fill stromg password"
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(409).json({
                message:"This user is already available"
            })
        }

        //hash password

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashPassword
        });
        res.status(201).json({
            message: "Register successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    }
    catch(error) {
        console.error("Registration error", error);
    }
})

router.get("/", (req, res) => {
    res.json({message: "Testing user"});
});

export default router;