import { randomBytes } from "crypto"
import express from "express"
import mongoose from "mongoose"
const Card = require("../models/Card/Card")
const Task = require("../models/Task")
const router = express.Router()

router.get("/",async(req,res)=>{
    try{
        const allTask = await Card.find({})
        res.json(allTask)
    }
    catch(err){
        res.status(500).json({err:err})
    }    
})

router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const IdItem = await Card.findById(id)
        
        res.json(IdItem)
    }
    catch(err){
        res.status(500).json({err:err})
    }
})


router.post('/',async(req,res)=>{
    let newCard = new Card({  
        card:[]
    })
    try{
        await newCard.save()
        res.json(newCard)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.post("/:cardId", async (req, res) => {
    //const id = await Card.find({ _id: req.params.cardId })
    const id = req.params.cardId;
    try{
        
        const addTask = await Card.findByIdAndUpdate(
            id,
            { $push: { card: {title:req.body.title,description:req.body.description} }},
        );
        await addTask.save()
        res.json(addTask)
    }catch(err){
        res.status(500).json({error:err})
    }
});
router.put("/update/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        const {objectId, title, description} = req.body;
const newCard = await Card.updateOne({_id:{$eq:id}, card: {$elemMatch:{_id:{$eq: objectId}}}}, {$set:{"card.$.title": title, "card.$.description": description}}, {new:true});
res.status(200).json('Successfully change.');
    }
    catch (error) {
        res.status(500).json({err:error})
    }
})

router.put("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    
    try{
        const deleted =  await Card.findByIdAndUpdate(id,{$pull:{ card: req.body.object}})
        if(deleted){
            const updated = await Card.findByIdAndUpdate(req.body._id,{$push:{ card: req.body.object}})
            res.status(201).json({updated})
        }
        else{
            res.json({message:"card not found"})
        }
    }
    catch(error){
        res.status(500).json({err:error})
    }

})


module.exports = router



