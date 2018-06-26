import React from 'react';

const timer =()=>(
	<p> It is {(new Date()).toLocaleTimeString()} o'clock</p>
);

export default timer;