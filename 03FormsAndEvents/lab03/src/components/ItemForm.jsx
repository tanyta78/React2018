import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemName: '',
			error:''
			
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

	}

	onInputChanged(event) {
		this.setState({
			itemName: event.target.value
		});
	}

	onFormSubmit(event) {
		event.preventDefault();

		//check if empty
		if(!this.state.itemName){
			this.setState({
				error:'Item can not be empty'
			});
			return;
		}else{
			this.setState({
				error:''
			});
		}
		this.props.addItem(this.state.itemName);
	}

	render() {
		let formName='My form';
		if(this.props.name.length >6){
			formName=this.props.name;
		}
		return (
			<form onSubmit={this.onFormSubmit}>
				<div>{formName}</div>
				<div>{this.state.error}</div>
				Item Name:
				<input
					type="text"
					name="name"
					onChange={this.onInputChanged} />
				<br />
				<input type="submit" />
			</form>
		);
	}
}

ItemForm.PropTypes={
	name:PropTypes.string
};

ItemForm.defaultProps={
	name:'Ivan'
};

export default ItemForm;