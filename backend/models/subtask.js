const mongoose =require("mongoose")

const subtaskSchema=mongoose.Schema({
    title: String,
    completed: Boolean,
    belongsTo: String
})

module.exports=mongoose.model('Subtask',subtaskSchema);