import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../../styles/header.css';

import observer from '../../api/observer';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
        observer.subscribe(observer.events.logoutUser,this.userLogout);
    }

    userLogout = ()=>{
		this.setState({username:''});
	}

    userLoggedIn = username =>
        this.setState({ username });

    render = () => {
        const loggedInSection =  
            <div id="profile">
                <span id="username">Hello, {this.state.username}!</span>|
                <Link to="/logout">logout</Link>
            </div>

        return (
            <header>
                <span className="logo">&#9884;</span>
                <span className="header">Scholastic</span>
                {this.state.username ? loggedInSection : null}
            </header>
        )
    }
}