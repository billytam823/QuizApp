import * as React from 'react';

// Contains the button to start the timer
export default class Timer extends React.Component{
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