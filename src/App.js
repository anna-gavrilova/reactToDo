import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Task from './components/task';
import Add from "./components/add";


class App extends Component {

constructor(props){
    super(props);
    this.state={
      tasks:[],
      isadded:false,
      term:''
    };

    this.addTask=this.addTask.bind(this);
    this.changeComplete=this.changeComplete.bind(this);

}

addTask(){


    const field=document.getElementById("newTaskTitle");
    const title=field.value;
    if(title==="")
      return;

    let arr={
      "title":title,
      "completed":false
    };

    this.setState({tasks:[arr,...this.state.tasks]});
    /*Actually adds the item into the "database"*/
    const jsonURL="http://localhost:3002/todos";
     fetch(jsonURL, {
                      method: 'POST',
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                    },
                      body: JSON.stringify(
                        arr)
                    });


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
      console.log(data);
      

    })



}

changeComplete(task){
let allTasks=this.state.tasks;
console.log(allTasks);
Array.prototype.forEach.call(allTasks,function(element,key) {
  if(task.id===element.id){
    allTasks[key].completed=!allTasks[key].completed;
    console.log(allTasks[key]);
  }
})
this.setState({
      tasks:[...allTasks]
    });

}

  render() {
    /*const task={
      "title":"Task1",
      "completed":false
    }
    const tasks=[task,task,task];*/
    return (
      <div className="main">
        <div className="addTask">
      <input type="text" id="newTaskTitle"/>
      <button onClick={this.addTask}>Click me!</button>

    </div>
        <div className="taskStack">
          {this.state.tasks.map((task)=>{
              return <Task key={task.id} task={task} clickHandler={this.changeComplete}/>
            }
          )}
        </div>
      </div>
    );
  }
}

export default App;
