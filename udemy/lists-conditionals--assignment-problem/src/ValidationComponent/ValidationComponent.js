import React from 'react';

const validationComponent = (props) => {
	let text='';
	 if(props.textLength < 5) {
		text = 'Text too short'
	 } else {
		 text = 'Text long enough'
	 }
	 return (
		 <p>{text}</p>
	 )
}

export default validationComponent;