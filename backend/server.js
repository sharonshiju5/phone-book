import express from "express"
const port =3000;
import mongoose, { connect, set } from "mongoose";
import todoSchema from "./models/todo.model.js"
const app=express()
app.use(express.static("../frontend"))
app.use(express.json())

app.post("/addtodo",async(req,res)=>{
    console.log(req.body);
    const{name,lastName,phone}=req.body;
    //add data to database
    await todoSchema.create({name,lastName,phone}).then(()=>{
        res.status(201).send({msg:"succesfully added"})
    }).catch((error)=>{
        res.status(400).send({error})
    }) 
})
// get todo
app.get("/gettodos",async(req,res)=>{
    try {
        const todos=await todoSchema.find();
        res.status(200).send(todos)
    } catch (error) {
        res.status(500).send(error)
    }
})
//delete
app.delete("/deletetodo/:_id",async(req,res)=>{
    const{_id}=req.params
    console.log(_id);
    await todoSchema.deleteOne({_id})
    .then(()=>{
        res.status(200).send({msg:"succesfully deleted"})
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
})
//connetc mongodb
mongoose.connect("mongodb://127.0.0.1:27017/BATCH930")
.then(()=>{
    console.log("database connected");
    // connect to port
    app.listen(port,()=>{
        console.log("server created");     
    })
})
.catch((error)=>{
    console.log(error);    
})
