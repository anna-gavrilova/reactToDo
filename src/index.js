import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Hello from './components/hello';
//import registerServiceWorker from './registerServiceWorker';


/*const newDiv=<div>
<Hello/>
<Hello name="Wesley"/>

</div>;
*/
//render rerenders the content of element everytime its executed
//ReactDOM.render(newDiv,document.getElementById('root'));
//ReactDOM.render(<Hello name="Anna" />, document.getElementById('root'));
//registerServiceWorker();

ReactDOM.render(<App/>,document.getElementById("root"));