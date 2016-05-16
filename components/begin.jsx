import * as React from 'react';
import Timer from '../components/timer';

//Contains the Adventure Questions
export default class Begin extends React.Component{
	constructor(){
		super();
		this.state= {
			// List of Adventures
			adventure:[
				{quest:"You have been summoned by the King, Will you Comply?", bg:"bg1", answer:"yes" ,result: false},
				{quest:"The King asks you to slay the Dragon, Will you Accept?", bg:"bg2",answer:"yes" ,result: false},
				{quest:"You Arrived at the Dragon's den, Will you Proceed?", bg:"bg3",answer:"yes" ,result: false},
				{quest:"As the fight continues, The Dragon decides to negociates half his wealth if you spare him, Will you Agree?",bg:"bg4", answer:"yes" ,result: false}
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

		if (success === this.state.adventure.length ){
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
			<div className= "begin-story">
				{ this.state.questionNum < this.state.adventure.length ?
				<div className="question-bg" id={this.state.adventure[this.state.questionNum].bg} >	
					<div className="question">
						<Timer setpage={this._nextFail.bind(this)} />
						<h3>{this.state.adventure[this.state.questionNum].quest}</h3>
						<form onSubmit={this._submit.bind(this)} >
							<input type="text" ref="reply" autofocus/>
						</form>
					</div>
				</div> : '' }
			</div>
		)
	}
}