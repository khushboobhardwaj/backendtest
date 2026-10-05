import mongoose from  "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: false,
        trim: true
    },
    completed:{
        type: String,
        required: false,
        trim: true,
        default: true
    }
}, {timestamps: true});

const todo = mongoose.model("todo", todoSchema);
export default todo;