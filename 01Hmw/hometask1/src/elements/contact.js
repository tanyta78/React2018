import React from 'react';
import timer from './timer';

const makeContact = (data,id,clickHandler)=>(
	<div className="contact" key={data.email} data-id={id}  onClick={()=>clickHandler(id)}>
		<span className="avatar small">&#9787;</span>
		<span className="title">{data.firstName} {data.lastName}</span>
	</div>
);
export default makeContact;