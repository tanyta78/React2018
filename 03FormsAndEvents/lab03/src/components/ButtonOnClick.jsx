import React,{Component} from 'react';
export default class ButtonWithClick extends Component{
	constructor(props){
		super(props);

		this.onButtonClicked=this.onButtonClicked.bind(this);
	}
	onButtonClicked (event){
		console.log(event);
		console.log(event.target);
		console.log(this.props.name);
	}
	render(){
		return(
			<button onClick={this.onButtonClicked}>Click me!</button>
		);
	}
}