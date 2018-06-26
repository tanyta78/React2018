import React from 'react';
import timer from './timer';

let data = 0;

const counter = (clickHandler,id)=>(
	<div className="counter">
		<p>You clicked me : {data} times</p>
		<button onClick={() => {data++;clickHandler(id);}}>Click me to show current time!</button>
		
	</div>
	
);

export default counter;