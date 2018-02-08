import React from "react";
import "./task.css";
class SubTask extends React.Component{

	render(){
		
			return <div className="subTask">{this.props.subtask.title}</div>
		
		}
}


export default SubTask;