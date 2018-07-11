import React from 'react';

const Input = (props) => {
	let type = props.type || 'text';

	return (
		<div>
			<label htmlFor={props.name}>{props.name}</label>
			<input
				type={type}
				name={props.name}
				placeholder={props.name}
				value={props.value}
				onChange={props.onChange} />
		</div>
	);
};

export default Input;