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
	_countDown(){

		//Toggle the state to true
		this.setState({show:true})

		this.timer = setInterval(()=>{
			if(this.state.seconds > 0){ //stops decrementing when it is 0
				this.setState({seconds:this.state.seconds -1})
			}
		},1000)

	}

	//Tracks when the component gets updated
	componentDidUpdate(prevProps, prevState) {
	    
	    //if time runs out, stop timer and reset timer
	     if (this.state.seconds === 0){
	     	clearInterval(this.timer);
	     	this.setState({seconds:10 , show:false});
	     }


	}

	//Formats the time to look like a digital clock
	_formatTime(){
		let minute = Math.floor(this.state.seconds/60);
		let seconds = Math.floor(this.state.seconds%60);

		//adds a 0 if its a single digit second
		if(seconds < 10){ seconds = '0' + seconds;}

		let time = minute+':'+seconds;
		return time;
	}

	render(){
		return(
			<div className="timer">
				{ !this.state.show ? 
					<div>
						<button onClick={this._countDown.bind(this)}>Time is Running Out!</button>
					</div> : <div><span>{this._formatTime()}</span><Adventure /></div>}
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
				{quest:"Question A", answer:"a" ,result: false},
				{quest:"Question B", answer:"a" ,result: false},
				{quest:"Question C", answer:"a" ,result: false},
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
				return adventure;
			});
			//replaces the old array with the new array
			this.setState({adventure : newAdventure});	
	 	}
	 	//Assign state to the next question
	 	this.setState({questionNum : this.state.questionNum+1});
	 	this.refs.reply.value = '';	 // return empty string to the input field
	}

	// Calculates the Outcome
	_outcome(){
		let success = 0;
		console.log(this.state.adventure);
		const endingResult = this.state.adventure.map((adventure)=>{
			if(adventure.result === true){
				success = success + 1;
			}
		});

		if (success > this.state.adventure.length/2 ){
			console.log('success');
		}else{
			console.log('fail'); 
		}
	}

	// Resets the questions
	componentDidUpdate(prevProps, prevState) {
		if(this.state.questionNum === 3){
			this._outcome();
			this.setState({questionNum:0})
		}
	}

	//Displays the Questions and User Input fields
	render(){
		return(
			<div className="begin-story">
				{ this.state.questionNum < 3 ?
				<div className="question">
					<h3>{this.state.adventure[this.state.questionNum].quest}</h3>
					<form onSubmit={this._submit.bind(this)}>
						<input type="text" ref="reply"/>
					</form>
				</div> : '' }
			</div>
		)
	}
}

class Success extends React.Component{
	render(){
		return(
			<div className="success-page">
				<h1>You Made It!!</h1>
			</div>
		)
	}
}

class fail extends React.Component{
	render(){
		return(
			<div className="fail-page">
				<h1>You Died!!</h1>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('react-app'));

