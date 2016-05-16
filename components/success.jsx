import * as React from 'react';

export default class Success extends React.Component{
	
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
			if(time === 10){
				this._nextPage();
			}
		},1000)

	}

	componentWillUnmount() {
	    clearInterval(this.timer);  
	}

	render(){
		return(
			<div className="success-page">
				<h1>Happily Ever After</h1>
				<i className="ra ra-wyvern" aria-hidden="true"></i>
			</div>
		)
	}
}