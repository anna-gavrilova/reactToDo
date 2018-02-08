import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Task from './components/task';


class App extends Component {

constructor(props){

    super(props);
    this.state={
      tasks:[]
    };


    this.addTask=this.addTask.bind(this);
    this.changeComplete=this.changeComplete.bind(this);

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
    .then(response=>response.json())
    .then((data)=>{
      data.forEach(function(subtask){
        console.log(subtask);
        if(subtask.belongsto===task.id)
          subArr.push(subtask);
      })
      });

    console.log("Hello from the app.js"+subArr);
    return subArr;
  }



  render() {
    return (
      <div className="main">
        <div className="addTask">
      <input type="text" id="newTaskTitle"/>
      <button onClick={this.addTask}>Click me!</button>

    </div>
        <div className="taskStack">
          {this.state.tasks.map((task)=>{
              return <Task key={task.id} task={task} clickHandler={this.changeComplete} retrieveSubTasks={this.getSubTasks}/>
            }
          )}
        </div>
      </div>
    );
  }
}

export default App;
