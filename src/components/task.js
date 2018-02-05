import React from "react";
import "./task.css";

/*const task={
	title:"Title",
	completed:false
}

<Task task={task}/>*/

class Task extends React.Component{

clickHandler=()=>{
	this.props.clickHandler(this.props.task);
}
	
	render(){

		const title=this.props.task.title;
		let completed=this.props.task.completed;
		let completedClassName=(!completed)?"task":"completedTask"
		return(
			<div className={completedClassName} onClick={this.clickHandler}>
				{title}
			</div>
			);
	}
}

export default Task;