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
						<button onClick={this._startAdventure.bind(this)}>Adventure Awaits...</button>
					</div> : <Timer />}
				</div>
			</div>
		)
	}
}

class Timer extends React.Component{
	constructor(){
		super();
		this.state= {
			seconds:10, 
			show:false
		}
	}

	//Start the countdown
	_countDownStart(){

		//Toggle the state to true
		this.setState({show:true})

		let timer = setInterval(()=>{
			if(this.state.seconds > 0){ //stops decrementing when it is 0
				this.setState({seconds:this.state.seconds -1})
			}
		},1000)
	}

	_formatTime(){
		const minute = math.floor(this.state.seconds/60);
		const seconds = math.floor(this.state.seconds%60);

		const time = minute+':'+seconds;
		return time
	}

	render(){
		return(
			<div className="timer">

				<span>{this_formatTime.bind(this)}</span>
				{ !this.state.show ? 
					<div>
						<button onClick={this._countDownStart.bind(this)}>Begin Your Adventure</button>
					</div> : <Adventure />}
			</div>
		)
	}
}



class Adventure extends React.Component{
	constructor(){
		super();
		this.state= {
			// List of Adventures
			adventure:[
				{quest:"Question A", answer:"A" ,result: false},
				{quest:"Question B", answer:"B" ,result: false},
				{quest:"Question C", answer:"C" ,result: false},
			],
			questionNum:0
		};
	}

	//Compares the answer to the quest, if same returns true
	 _submit(e){
	 	e.preventDefault();

	 	//Compares the input answer with array's "answer" 
	 	if(this.refs.reply.value === this.state.adventure[this.state.questionNum].answer){
	
	 		// Assign newAdventure as the array to be modified
			const newAdventure = this.state.adventure.map((adventure)=>{

				// if the current object matches the object in the list, then return true
				if(this.state.adventure[this.state.questionNum] === adventure){
					adventure.result = true;
				}
				//return the new object that is updated
				return adventure;
			});

			//replaces the old array with the new array
			this.setState({adventure : newAdventure});	
	 	}

	 	//Assign state to the next question
	 	this.setState({questionNum : this.state.questionNum+1});
	}

	//Displays the Questions and User Input fields
	render(){
		return(
			<div className="begin-story">
				<h3>{this.state.adventure[this.state.questionNum].quest}</h3>
				<form onSubmit={this._submit.bind(this)}>
					<input type="text" ref="reply"/>
				</form>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('react-app'));

