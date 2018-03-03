import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Task from './components/task';
import "./inputEffects.css";


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


    /*Actually adds the item into the "database"*/
    const jsonURL="http://localhost:3002/todos";
     fetch(jsonURL, {
                      method: 'POST',
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                               },
                      body: JSON.stringify(
                        {
                          "title":title,
                          "completed":false,
                          "hasSubTask":false
                        })
                    });
    let arr={
      "title":title,
      "completed":false,
      "id":this.state.tasks.length+1,
      "hasSubTask":false
    };

    this.setState({tasks:[arr,...this.state.tasks]});
    field.value="";
    field.focus();


  }

componentDidMount(){
  const jsonURL="http://localhost:3002/todos";
  fetch(jsonURL)
    .then(response=>response.json())
    .then((data)=>{
      if(data.length!==undefined){
      this.setState({
        tasks:data.reverse()
      });}
      //console.log(data);
      

    })



}
/*On click changes the completness sttus in database and updates the state for the current view*/
/*TODO:change the actual database field "completed"*/
changeComplete(task){
  
  /*Retrieves an array from the state, changes it and sets the new state */
let allTasks=this.state.tasks;
Array.prototype.forEach.call(allTasks,function(element,key) {
  if(task.id===element.id){
    allTasks[key].completed=!allTasks[key].completed;
    const jsonURL="http://localhost:3002/todos/"+element.id;
    fetch(jsonURL, {
                      method: 'PATCH',//patch partially modifies the record in the "database" and sets it to the current
                      //completeness status retrieved from the state
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                               },
                      body: JSON.stringify(
                        {
                          "completed":allTasks[key].completed
                        })
                    });
  }
})
this.setState({
      tasks:[...allTasks]
    });

/*TODO:read the json file, store it in the array and rewrite te json file*/
}


getSubTasks(task){
 const jsonURL="http://localhost:3002/subtasks";
 let subArr=[];
    fetch(jsonURL)
    .then(results=>{return results.json()})
    .then((data)=>{
      data.map((subtask)=>{
          if(subtask.belongsto===task.id){
              subArr.push(subtask);
          }
      return true
      });
      

      });
    //console.log("subArr from app",task.id,subArr)
    return subArr;
  }

  deleteTask(task){

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
    const jsonURL="http://localhost:3002/subtasks";
    fetch(jsonURL, {
                      method: 'POST',
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                               },
                      body: JSON.stringify(
                        {
                          "title":title,
                          "completed":false,
                          "belongsto":task.id
                        })
                    });






      const URL="http://localhost:3002/todos/"+task.id;
    fetch(URL, {
                      method: 'PATCH',//patch partially modifies the record in the "database" and sets it to the current
                      //completeness status retrieved from the state
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                               },
                      body: JSON.stringify(
                        {
                          "hasSubTask":true
                        })
                    });

    let allTasks=this.state.tasks;
Array.prototype.forEach.call(allTasks,function(element,key) {
  if(element.id===task.id){
    allTasks[key].hasSubTask=true;
  }
    });

  this.setState({tasks:[...allTasks]});



  }




  render() {
    return (
      <div className="main">
        <div className="addTask">
       <span className="input input--ruri">
          <input className="input__field input__field--ruri" type="text" id="newTaskTitle" />
          <label className="input__label input__label--ruri" htmlFor="newTaskTitle">
            <span className="input__label-content input__label-content--ruri">Username</span>
          </label>
        </span>
      <button onClick={this.addTask}>Click me!</button>

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
