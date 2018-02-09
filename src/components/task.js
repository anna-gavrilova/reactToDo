import React from "react";
import "./task.css";
import SubTask from "./subTask.js";
import ReactModal from 'react-modal';

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
		subExpanded:false,
		isModal:false
	};
	
	
	this.hoverHandler=this.hoverHandler.bind(this);
	this.callModal=this.callModal.bind(this);
	this.handleCloseModal=this.handleCloseModal.bind(this);
	this.addSub=this.addSub.bind(this);
}
componentWillMount(){
	if(this.state.hasSubTasks)
 		this.setState({
		subTasks:[this.props.retrieveSubTasks(this.props.task).reverse()]
	});
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
	
	//return this.props.retrieveSubTasks(this.props.task);
	
	
}

deleteTask=()=>{

	this.props.deleteTask(this.props.task);
}

callModal=()=>{

	this.setState({isModal:true,isHovered:false});
	console.log("Modal shown!");
}
handleCloseModal=()=>{

	this.setState({isModal:false});
	console.log("Modal hidden!");
}
addSub=()=>{
	let taskField=document.getElementById("subtaskTitle");
	
	this.props.addSubTask(this.props.task,taskField.value);
	
	let arr={
		"title":taskField.value,
      	"completed":false,
      	"id":999,
      	"belongsto":this.props.task.id
	}
	
 	this.setState({isModal:false,subExpanded:true});
 	this.setState({subTasks:[[arr,...this.state.subTasks[0]]]});

}

	
	render(){
		const title=this.props.task.title;
		let completed=this.props.task.completed;
		let completedClassName=(!completed)?"task":"completedTask";
		let btnsClass=this.state.isHovered?"btnVis":"btnHid";
		let subTaskVisible=this.state.subExpanded?"subVis":"subHid";
		let subTasksBtn=this.state.subExpanded?require('./hideSub.png'):require('./subIcon.png');
		let subBtnUrl=this.props.task.hasSubTask?subTasksBtn:require('./addSub.png');
		console.log(this.props.task.hasSubTask);

		if(this.props.task.hasSubTask){
			//console.log("from render",this.state.subTasks);
			let arrayToIterate=this.state.subTasks[0];
			
				return(
					<div onMouseOver={this.hoverHandler} onMouseOut={this.hoverHandler}>
					  <div>
					        <ReactModal 
					           isOpen={this.state.isModal}
					           onRequestClose={this.handleCloseModal}
					           className="Modal"
					           overlayClassName="Overlay"
					        >
					          <input type="text" id="subtaskTitle"/>

          					  <button onClick={this.addSub}>New Subtask</button>
					          <button onClick={this.handleCloseModal}>Close Modal</button>
					        </ReactModal>
				      </div>
						<span className={btnsClass}><img alt="" src={require('./addSub.png')} onClick={this.callModal}/><img alt="" src={subBtnUrl} onClick={this.expandSubTasks}/></span>
							<div className={completedClassName+' '+"hasSub"} onClick={this.clickHandler}>
								{title}
							</div>
						<span className={btnsClass} onClick={this.deleteTask}> <img alt="" src={require('./deleteTask.png')}/></span>
				     
							<div className={subTaskVisible}>
          						{arrayToIterate.map((subt)=>{
              					return <SubTask key={subt.id} subtask={subt}/>
							            }
							          )}
        				</div>
					</div>


					     
       				
					);
			}else return (<div onMouseOver={this.hoverHandler} onMouseOut={this.hoverHandler}>
			  <div>
        <ReactModal 
           isOpen={this.state.isModal}
           onRequestClose={this.handleCloseModal}
           className="Modal"
           overlayClassName="Overlay"
        >
          <input type="text" id="subtaskTitle"/>
          <button onClick={this.addSub}>New Subtask</button>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
						<span  className={btnsClass} onClick={this.expandSubTasks}><img alt="" src={subBtnUrl} onClick={this.callModal}/></span>
							<div className={completedClassName} onClick={this.clickHandler}>
								{title}
							</div>
						<span className={btnsClass} onClick={this.deleteTask}> <img alt="" src={require('./deleteTask.png')}/></span>
				     





					</div>);
		
		
	}
}

export default Task;