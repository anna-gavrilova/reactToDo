import React from "react";
import "./task.css";


class Add extends React.Component{


	


	addTask(){
		const field=document.getElementById("newTaskTitle");
		const title=field.value;
		let arr={
			"title":title,
			"completed":false
		};
		
		/*const jsonURL="https://raw.githubusercontent.com/anna-gavrilova/reactToDo/master/src/components/tasks.json";
  			fetch(jsonURL)
    			.then(response=>response.json())
   		     	 .then((data)=>{
   		     	 	data.push(arr)
   		     	 	console.log(data)
      				App.setState({
        			tasks:data
      });
    })*/

		field.value="";
		field.focus();


	}

	render(){

		return (<div className="addTask">
			<input type="text" id="newTaskTitle"/>
			<button onClick={this.addTask}>Click me!</button>

		</div>);
	}
}

export default Add;