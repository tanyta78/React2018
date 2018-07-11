import React,{Component} from 'react';
import withErrorHandling from './withErrorHandling';

class BuggyCounterBase extends Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0 };
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState(({counter}) => ({
			counter: counter + 1
		}));
	}
	
	render() {
		if (this.state.counter === 5) {
		// Simulate a JS error
			throw new Error('I crashed!');
		}
		return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
	}
}


const BuggyCounter=withErrorHandling(BuggyCounterBase);

export default BuggyCounter;