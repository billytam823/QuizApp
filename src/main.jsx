import * as React from 'react';
import * as ReactDOM from 'react-dom';

require('../src/main.scss');

class App extends React.Component{	
	constructor(){
		super();
		this.state={show:true}
	}

	// Setting the state to false
	_startAdventure(e){
		e.preventDefault();
		this.setState({show:false})
	}

	// Display the initial page, switches to Adventure class on click
	render(){
		return(
			<div className="adventure-app">
				<div className="sidebar">
					<h1>Adventure</h1>
				</div>
				<div className="content">
					{/* When button is click, switch to adventure class */}
					{this.state.show ? <div className="accept-adventure">
						<h1>Your Adventure Begins Here</h1>
						<button onClick={this._startAdventure.bind(this)}>Adventure Awaits...</button>
					</div> : <Adventure />}
				</div>
			</div>
		)
	}
}


class Adventure extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			// List of Adventures
			adventure:[
				{quest:"Question A", answer:"A" ,result: false},
				{quest:"Question B", answer:"B" ,result: false},
				{quest:"Question C", answer:"C" ,result: false},
			],
			success:0
		};
	}

	//Compares the answer to the quest, if same returns true
	_submit(e){
		e.preventDefault();
		// Assign newAdventure as the array
		// let newAdventure = this.state.adventure.map(()=>{
		// 	if()
		// })
	}

	//Displays the Questions and User Input fields
	render(){
		return(
			<div className="begin-story">
				<h3>{this.state.adventure[0].quest}</h3>
				<form onSubmit={this._submit.bind(this)}>
					<input type="text" ref="reply"/>
				</form>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('react-app'));

