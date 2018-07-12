import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import userService from '../../services/userService';

export default class Logout extends Component {
  
    render = () => {
        userService.logout();
        return <Redirect to='/' />
    }
}