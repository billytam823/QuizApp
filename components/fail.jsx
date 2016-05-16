import * as React from 'react';

export default class Fail extends React.Component{	

	//Brings the page back to start
	_nextPage(){
		this.props.setpage('start');
	}

	//Starts timer on mount
	componentDidMount() {
	 	let time = 0;

	 	this.timer = setInterval(()=>{
			time++;


			//if timer hits 5, run nextPage
			if(time === 6){
				this._nextPage();
			}
		},1000)

	}

	componentWillUnmount() {
	    clearInterval(this.timer);  
	}

	render(){
		return(
			<div className="fail-page">
				<div>
					<h1>Your Fate Ends...</h1>
					<p>....A New Story Begins</p>
				</div>
			</div>
		)
	}
}