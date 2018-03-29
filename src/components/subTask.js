import React from "react";
import "./task.css";
class SubTask extends React.Component{

	constructor(props){
	super(props);
	this.state={
		isCompleted:this.props.subtask.completed,
		isHovered:false
	}

	this.completeSubTask=this.completeSubTask.bind(this);
	this.hoverHandler=this.hoverHandler.bind(this);
	this.deleteSubTask=this.deleteSubTask.bind(this);
	}

	hoverHandler=()=>{
		this.setState({isHovered:!this.state.isHovered});
		console.log("hovered");
	}

	completeSubTask(){

		this.setState({isCompleted:!this.state.isCompleted});
		let url="http://localhost:3002/subtasks/"+this.props.subtask.id;
		fetch(url, {
                      method: 'PATCH',//patch partially modifies the record in the "database" and sets it to the current
                      //completeness status retrieved from the state
                      headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                               },
                      body: JSON.stringify(
                        {
                          "completed":!this.state.isCompleted
                        })
                    });

	}

	deleteSubTask(){
		this.props.deleteSubTask(this.props.subtask);
	}

	render(){

		let subCompleteStatus=this.state.isCompleted?"subCompleted":"";
		let btnVis=this.state.isHovered?"btnVis":"btnHid";
		
			return <div onMouseOver={this.hoverHandler} 
						onMouseOut={this.hoverHandler}>
					<img src={require('./deleteTask.png')} className={"delSubBtn"+' '+btnVis} onClick={this.deleteSubTask}/>

			<span>

			<div className={'subTask'+' '+subCompleteStatus} 
				onClick={this.completeSubTask}
				>{this.props.subtask.title}
			</div></span></div>
		
		}
}


export default SubTask;