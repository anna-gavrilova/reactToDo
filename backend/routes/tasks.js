const express = require("express");
const router = express.Router();
const Task = require("../models/task")
const Subtask=require("../models/subtask")
const util = require("../util");
router.useMethod;


//adding new task
router.post("/",(req,res,next)=>{
    console.log(".post")
    console.log(req.body);
    const newTask= new Task({
        title:req.body.title,
        completed:false,
        amtOfSubtasks: 0
    })

    newTask.save(newTask,(err,task)=>{
        if(err){
            util.resError(res,err)
        }else{
            util.res(res,true,"Task was addes",newTask);
        }
      })

});

//get all the tasks
router.get("/",(req,res,next)=>{
   Task.find({},(err,data)=>{
       if(err){
           util.resError(res,err);
       }
       else util.res(res,true,"Tasks were retrieved",data)
   })
})

//mark task as done/undone
router.post("/do",(req,res,next)=>{
    console.log("changing status");
    Task.findById(req.body.task._id, function (err, task) {
        if (err) util.resError(res,err)
        else{
        task.completed=!task.completed;
        task.save(err,task=>{
            if(err)
            util.resError(res,err)
            else
            util.res(res,true,"Task was updated",task)
        });
    }
      });
})

//adding subtask to a task
router.post("/sub",(req,res,next)=>{
    console.log("Adding subtask....");
    console.log(req.body)
    const newSub=new Subtask({
        title:req.body.sub,
        completed:false,
        belongsTo: req.body.task._id
    })
    newSub.save(newSub,(err,sub)=>{
        if(err) util.resError(res.err);
        else{
            Task.findById(req.body.task._id,(err,task)=>{
                if (err) util.resError(res,err)
                else{
                task.amtOfSubtasks=++task.amtOfSubtasks
                task.save(err,task=>{
                    if(err)
                    util.resError(res,err);
                    else
                    util.res(res,true,"Subtask was added",sub);
                    
                })
                }
            })
        }
    })

})

router.get("/sub/:id",(req,res,next)=>{
    Subtask.find({belongsTo:req.params.id},(err,subs)=>{
        if(err) 
        util.resError(res,err);
        else{
        
        util.res(res,true,"Subtasks were retrieved",subs);
        }
    })
})

module.exports = router;