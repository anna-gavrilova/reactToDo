import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Task from './components/task';
import axios from 'axios';
var taskUrl="http://127.0.0.1:3001/api/tasks/";


class App extends Component {

constructor(props){

    super(props);
    this.state={
      tasks:[]
    };


    this.addTask=this.addTask.bind(this);
    this.changeComplete=this.changeComplete.bind(this);
    this.deleteTask=this.deleteTask.bind(this);
    this.addSubTask=this.addSubTask.bind(this);

}

addTask(){


    const field=document.getElementById("newTaskTitle");
    const title=field.value;
    if(title==="")
      return;

    var body=
      {
        title:title,
        completed:false,
        hasSubTask:false,
        amtOfSubtasks:0
      };

    axios.post('http://127.0.0.1:3001/api/tasks',{title:title}).then(
      res=>{
        field.value="";
        field.focus();
        this.getTasks();
      }
      
    )

  
    field.value="";
    field.focus();
}

componentDidMount(){
  this.getTasks();
}

getTasks(){
 axios.get(taskUrl)
  .then(response=>{
    if(response['data']['success']){
      this.setState({
        tasks:response.data.docs.reverse()
      })
    }
  })
}

/*On click changes the completness sttus in database and updates the state for the current view*/
/*TODO:change the actual database field "completed"*/
changeComplete(task){
  axios.post('http://127.0.0.1:3001/api/tasks/do',{task})
    .then(res=>{
      this.getTasks();
    })

}


getSubTasks(task){
  console.log("imtryinhere")
  console.log(task)
  var subarr;
  return axios.get("http://localhost:3001/api/tasks/sub/"+task._id)

  }

//delete task
  deleteTask(task){

    axios.delete("http://localhost:3001/tasks/"+task.id)

     const jsonURL= "http://localhost:3002/todos/"+task.id;
     fetch(jsonURL, {
                      method: 'DELETE',
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                }
                    
      });

     let temp=this.state.tasks;
     temp.forEach(function(element,key) {
        if(element.id===task.id)
          temp.splice(key,1);
          ;})
     this.setState({tasks:[...temp]});

     //Get array of subtasks from the database
     //iterate through this array, find all with belongs to = task.id
     //delete those
     let url="http://localhost:3002/subtasks/";
     fetch(url)
    .then(results=>{return results.json()})
    .then((data)=>{
      data.map((subtask)=>{
          if(subtask.belongsto===task.id){
                fetch(url+subtask.id, {
                      method: 'DELETE',
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                }
                    
      });
          }
      });
      

      });

  }



  addSubTask(task,title){
    const jsonURL="http://localhost:3001/api/tasks/sub";
    axios.post(jsonURL,{task:task,sub:title}).then(_=>{
      this.getTasks();
    })
  }






  render() {
    return (
      <div className="main">
        <div className="addTask">
      
      <input type="text" className="mainInput" id="newTaskTitle"/>
      <button className="btn btn-primary modalBtn"onClick={this.addTask}>+</button>

    </div>
        <div className="taskStack">
          {this.state.tasks.map((task)=>{
              return <Task key={task.id}
                           task={task}
                           clickHandler={this.changeComplete}
                           retrieveSubTasks={this.getSubTasks}
                           deleteTask={this.deleteTask}
                           addSubTask={this.addSubTask}/>
            }
          )}
        </div>
      </div>
    );
  }
}

export default App;
