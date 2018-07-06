import React, { Component } from 'react';
import List from './List';
import ItemForm from './ItemForm';

export default class Container extends Component {
	constructor(params) {
		super(params);
		this.state = {
			items: []
		};

		this.addItem=this.addItem.bind(this);
	}

	addItem(name) {
		this.setState(prevState=>{
			let items=prevState.items;

			items.push({
				id: items.length+1,
				name
			});
			return{
				items
			};
		});
	}

	render() {
		return (
			<div>
				<h1>MyPage</h1>
				{this.props.children}
				<List items={this.state.items}/>
				<ItemForm addItem={this.addItem} name='Welcome'/>
			</div>
		);
	}
}