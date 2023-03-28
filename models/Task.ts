import mongoose  from "mongoose" 

const TaskSchema = new mongoose.Schema({
    cardId :{type:String}, 
    title:{type:String},
    description:{type:String}
   
   
})
module.exports = mongoose.model("Task",TaskSchema)