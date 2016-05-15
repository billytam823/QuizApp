import * as React from 'react';
import * as ReactDOM from 'react-dom';

require('../src/main.scss');

class App extends React.Component{	
	constructor(){
		super();
		this.state={
			page: 'start'
		}
	}

	// Switches the state base on which page
	_setPage(page){
		this.setState({page})
	}

	// Switch content base on where we are
	_renderPage(){
		switch(this.state.page){
			case 'start':
				return(<Start setpage={this._setPage.bind(this)}  />)
			case 'ready':
				return(<Ready setpage={this._setPage.bind(this)} />)
			case 'begin':
				return(<Begin setpage={this._setPage.bind(this)} />)
			case 'success':
				return(<Success setpage={this._setPage.bind(this)} />)
			case 'fail':
				return(<Fail setpage={this._setPage.bind(this)} />)
		}
	}

	render(){
		return(
			<div className="adventure-app">
				<div className="sidebar">
					<h1>Adventure</h1>
				</div>
				<div className="content">
					{this._renderPage()}
				</div>
			</div>
		)
	}
}

// Starting state with the button
class Start extends React.Component{

	//brings the page to the Timer page
	_nextPage(){
		this.props.setpage('ready');
	}

	render(){
		return(
			<div>
				<div className="preload"></div>
				<button onClick={this._nextPage.bind(this)}>Adventre Awaits...</button>
			</div>
		)
	}
}

// Contains the button to start the timer
class Timer extends React.Component{
	constructor(){
		super();
		this.state= {
			seconds:60, 
		}
	}

	//brings the page to the Fail page
	_nextPage(){
		this.props.setpage('fail');
	}

	//Start the countdown
	componentDidMount(){

		//Set timer seconds on mount
		this.setState({seconds:60})

		//Start clock tick
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
	     	this._nextPage();
	     }

	}

	componentWillUnmount() {
       clearInterval(this.timer);
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
					<div>
						<span>{this._formatTime()}</span>
					</div>
			</div>
		)
	}
}

//Constains the Ready Button
class Ready extends React.Component{
	
	//brings the page to Adventure page
		_nextPage(){
			this.props.setpage('begin');
		}

	render(){
		return(
			<div>
				<button onClick={this._nextPage.bind(this)}>Are you Ready?</button>
			</div>
		)
	}

}

//Contains the Adventure Questions
class Begin extends React.Component{
	constructor(){
		super();
		this.state= {
			// List of Adventures
			adventure:[
				{quest:"You have been summoned to the army, Will you Comply?", answer:"yes" ,result: false},
				{quest:"The King asks you to slay the Dragon, Will you Accept?", answer:"yes" ,result: false},
				{quest:"You Arrived at the Dragon's den, Will you Proceed?", answer:"yes" ,result: false},
				{quest:"As the fight continues, The Dragon decides to negociates half his wealth if you spare him, Will you Agree?", answer:"no" ,result: false}
			],
			questionNum:0
		};
	}

	//Change page to Success Page
	_nextSuccess(){
		this.props.setpage('success');
	}

	//Change page to Fail Page
	_nextFail(){
		this.props.setpage('fail');
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
				} return adventure;
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
		const endingResult = this.state.adventure.map((adventure)=>{
			if(adventure.result === true){
				success = success + 1;
			}
		});

		if (success > this.state.adventure.length/2 ){
			this._nextSuccess();
		}else{
			this._nextFail(); 
		}
	}

	// Resets the questions
	componentDidUpdate(prevProps, prevState) {
		if(this.state.questionNum === this.state.adventure.length){
			this._outcome();
			this.setState({questionNum:0})
		}
	}

	// Focus input field on Mount
	componentDidMount() {
	 	this.refs.reply.focus();     
	}

	//Displays the Questions and User Input fields
	render(){
		return(
			<div className="begin-story">
				{ this.state.questionNum < this.state.adventure.length ?
				<div className="question">
					<Timer setpage={this._nextFail.bind(this)} />
					<h3>{this.state.adventure[this.state.questionNum].quest}</h3>
					<form onSubmit={this._submit.bind(this)} >
						<input type="text" ref="reply" autofocus/>
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
				<h1>You Have Defeated the Dragon!!</h1>
			</div>
		)
	}
}

class Fail extends React.Component{	

	//Goes back to the starting page
	_reset(){
		// let restart = setTimeout( this.props.setpage('start'), 3000);
	}


	render(){
		return(
			<div className="fail-page">
				<h1>You Died!!</h1>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('react-app'));

