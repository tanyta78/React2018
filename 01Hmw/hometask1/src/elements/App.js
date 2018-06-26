import React from 'react';
import logo from './logo.svg';
import './App.css';
import makeContact from './contact';
import counter from './counter';
import timer from './timer';
import ContactList from '../data/contacts.json';

const App = (clickHandler,id)=>{
	const currentUser = ContactList[id];
	
	return(
		<div className="container">
			<header>&#9993; Contact Book</header>
			<div id="book">
				{timer()}
				<div id="list">
					<h1>Contacts</h1>
					<div className="content">
						{ContactList.map((c,i)=>makeContact(c,i,clickHandler))}
					</div>
				</div>
				<div id="details">
					<h1>Details</h1>
					<div className="content">
						<div className="info">
							<div className="col">
								<span className="avatar">&#9787;</span>
							</div>
							<div className="col">
								<span className="name">{currentUser.firstName}</span>
								<span className="name">{currentUser.lastName}</span>
							</div>
						</div>
						<div className="info">
							<span className="info-line"> &#9742; {currentUser.phone}</span>
							<span className="info-line">&#9993; {currentUser.email}</span>
						</div>
					</div>
				</div>
				{counter(clickHandler,id)}
			</div>
			<footer>Contact Book SPA &copy; 2017</footer>
		</div>
	);
};

export default App;
