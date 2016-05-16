import * as React from 'react';
import * as ReactDOM from 'react-dom';

//importing components
import Start from '../components/start';
import Ready from '../components/ready';
import Begin from '../components/begin';
import Success from '../components/success';
import Fail from '../components/fail';

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

ReactDOM.render(<App/>, document.getElementById('react-app'));

