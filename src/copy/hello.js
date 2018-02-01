import React from "react"; // import react class from react package


//define the components
class Hello extends React.Component{

	render(){
		//TODO
		return <div>Hello from hello.js<br/>{this.props.name}</div>;
	}

}

export default Hello;