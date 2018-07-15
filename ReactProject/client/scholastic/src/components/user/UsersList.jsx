import React, {Component} from 'react';

import User from './User';
import userService from '../../services/userService';
import '../../styles/all.css';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[]
        }
    }
    
	componentDidMount(){
		userService.getAllUsers().then(users=>
            this.setState(users)
        )
	}
	
    render = () => {
      
        const users = this.state.users.map((c, i) => {
            return <User key={i} index={i} {...c} />;
        });
            
        return (
            <div id="allComments" className="comments">
                {users}
            </div>
        )
    }
}