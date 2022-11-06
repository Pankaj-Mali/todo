const mongoose= require("mongoose");

const Schema= mongoose.Schema

const todoSchema= new Schema({
    act:{type:String , required: true , unique:true},
    time:{type:String},
    status:{type:String , required: true },
    user:{type:Schema.Types.ObjectId , ref:"User"}
})

const todo = mongoose. model("Todo" , todoSchema);

module.exports=todo;