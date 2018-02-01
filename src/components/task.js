import React from "react";
import "./task.css";

/*const task={
	title:"Title",
	completed:false
}

<Task task={task}/>*/

class Task extends React.Component{

	
	render(){

		const title=this.props.task.title;
		let completed=this.props.task.completed;
		let completedClassName=(!completed)?"task":"completedTask"
		return(
			<div className={completedClassName}>
				{title}
			</div>
			);
	}
}

export default Task;