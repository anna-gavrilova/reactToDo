import React from "react";
import "./task.css";
import Task from "./task";
class SubTask extends React.Component{

	render(){
		
			return <div className="subTask">{this.props.subtask.title}</div>
		
		}
}


export default SubTask;