import mongoose  from "mongoose" 

const CardSchema = new mongoose.Schema({
    card:[
        {
            title:{
                type: String
            },
            description:{
               type:String
            }
            
        }   
    ],
   
})
module.exports = mongoose.model("Card",CardSchema)