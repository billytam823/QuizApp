import * as React from 'react';

// Starting state with the button
export default class Start extends React.Component{

	//brings the page to the Timer page
	_nextPage(){
		this.props.setpage('ready');
	}

	render(){
		return(
			<div>
				<div className="preload"></div>
				<button onClick={this._nextPage.bind(this)}>An Adventre Awaits...</button>
			</div>
		)
	}
}