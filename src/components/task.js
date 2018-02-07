import React from "react";
import "./task.css";

/*const task={
	title:"Title",
	completed:false
}

<Task task={task}/>*/

class Task extends React.Component{

constructor(props){
	super(props);
	this.state={
		isHovered:false,
		hasSubTasks:false,
		subTasks:[]
	};
	this.hoverHandler=this.hoverHandler.bind(this);
}

clickHandler=()=>{
	this.props.clickHandler(this.props.task);
}

hoverHandler=()=>{
	this.setState({
		isHovered:!this.state.isHovered});
	console.log("class changed!");
}
	
	render(){

		const title=this.props.task.title;
		let completed=this.props.task.completed;
		let completedClassName=(!completed)?"task":"completedTask";
		let btnsClass=this.state.isHovered?"btnVis":"btnHid";
		return(
			<div onMouseOver={this.hoverHandler} onMouseOut={this.hoverHandler}>
			<span className={btnsClass}><img src={require('./subIcon.png')}/></span>
				<div className={completedClassName} onClick={this.clickHandler}>
					{title}
				</div>
			</div>
			);
	}
}

export default Task;