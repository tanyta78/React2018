import React, { Component } from 'react';

export default class Input extends Component {
	render() {
		const { name, type, value, onChange, label } = this.props;
		return (
			<div className="form-group ">
				<label className="form-control-label" htmlFor={name}>{label}</label>
				<input 
					onChange={onChange}
					className="form-control" 
					name={name} 
					id={name} 
					type={type} 
					value={value} />
				{false && <div className="form-control-feedback">This input value is valid</div>}
			</div>
		);
	}
}