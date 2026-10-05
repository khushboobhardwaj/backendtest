import express from "express"
import todo from "../model/TODO.js";
const router = express.Router();

router.post("/", async(req, res)=>{
    try{
        const {title, completed} = req.body;
        if(!title){
                return res.status(400).json({
                    message: "Please fill all fields"
                })
            }
        const todos = await todo.create({
            title, completed
        })
        res.status(201).json({
            message: "entry saved successfully"
        })
    }
    catch(err){
        console.log(err);
    }
});

// get data of to do

router.get("/", async (req, res) => {
    try{ 
    const gettodo = await todo.find();
    res.status(201).json({
        message: "Deleted successfully"
    });
    }
    catch(error){
        console.log("throwing error:", "faliur")
    }
    
})
 
// Put Data 

// router.put("/:id", async (req, res) => {
//     try{ 
//     const gettodo = await todo.findByIdAndUpdate(req.params.id, {
//         completed: req.body.completed
//     }, {new: "good job"});
//     res.status(201).json(gettodo);
//     }
//     catch(error){
//         console.log("throwing error:", error)
//     }
    
// })
router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            req.params.id,
            {
                completed: req.body.completed
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }    
});

// delete 

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deletetodo = await todo.findByIdAndDelete(id);
        res.status(201).json({
            message:"delete success"
        })
    }
    catch(error){
        res.json({
            message: error
        })
    }
});

export default router