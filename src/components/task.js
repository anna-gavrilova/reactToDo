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
		hasSubTasks:this.props.task.hasSubTask,
		subTasks:[],
		subExpanded:false
	};
	if(this.state.hasSubTasks)
		this.setState({subTasks:this.retrieveSubTasks()});

	this.hoverHandler=this.hoverHandler.bind(this);
}

clickHandler=()=>{
	this.props.clickHandler(this.props.task);
}

hoverHandler=()=>{
	this.setState({
		isHovered:!this.state.isHovered});
	//console.log(this.state.hasSubTask);
}

expandSubTasks=()=>{
	this.setState({subExpanded:!this.state.subExpanded});
}
retrieveSubTasks=()=>{
	
		return this.props.retrieveSubTasks(this.props.task)
	
}
	
	render(){

		const title=this.props.task.title;
		let completed=this.props.task.completed;
		let completedClassName=(!completed)?"task":"completedTask";
		let btnsClass=this.state.isHovered?"btnVis":"btnHid";
		let subTaskVisible=this.state.subExpanded?"subVis":"subHid";
		let btnUrl=this.props.task.hasSubTask?require('./subIcon.png'):require('./addSubTask.png');
		return(
			<div onMouseOver={this.hoverHandler} onMouseOut={this.hoverHandler}>
				<span className={btnsClass} onClick={this.expandSubTasks}><img src={btnUrl}/></span>
					<div className={completedClassName} onClick={this.clickHandler}>
						{title}
					</div>
					<div className={subTaskVisible}>

					</div>
			</div>
			);
	}
}

export default Task;