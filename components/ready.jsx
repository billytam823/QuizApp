import * as React from 'react';

//Constains the Ready Button
export default class Ready extends React.Component{
	
	//brings the page to Adventure page
		_nextPage(){
			this.props.setpage('begin');
		}

	render(){
		return(
			<div>
				<button onClick={this._nextPage.bind(this)}>You can only say "yes"</button>
			</div>
		)
	}

}