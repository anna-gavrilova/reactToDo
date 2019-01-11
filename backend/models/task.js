const mongoose = require('mongoose');

var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const taskSchema=mongoose.Schema({

    title: String,
    completed: Boolean,
    amtOfSubtasks: Number

},schemaOptions)

taskSchema.virtual('hasSubTask').get(function(){
    if(this.amtOfSubtasks!==0){
        
        return true;
    }
    else return false;
})



module.exports=mongoose.model('Task',taskSchema);