import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Task from './components/task';
import Add from "./components/add";

class App extends Component {

constructor(props){
    super(props);
    this.state={
      tasks:[]
    };

}

componentDidMount(){
  const jsonURL="https://raw.githubusercontent.com/anna-gavrilova/reactToDo/master/src/components/tasks.json";
  fetch(jsonURL)
    .then(response=>response.json())
    .then((data)=>{
      this.setState({
        tasks:data
      });
      console.log(data);
    })



}

  render() {
    /*const task={
      "title":"Task1",
      "completed":false
    }
    const tasks=[task,task,task];*/
    return (
      <div className="main">
        <Add/>
        <div className="taskStack">
          {this.state.tasks.map((task)=>{
              return <Task task={task}/>
            }
          )}
        </div>
      </div>
    );
  }
}

export default App;
