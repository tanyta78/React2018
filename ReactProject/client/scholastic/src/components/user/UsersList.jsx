import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import User from './User';
import userService from '../../services/userService';
import '../../styles/all.css';

 class UserList extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[]
        }
    }
    
	componentDidMount(){
		userService.getAllUsers().then(users=>
            this.setState({users:users})
        )
	}
	
    render = () => {
        const users = this.state.users.map((c, i) => {
            return <User key={i} index={i} {...c} userInfo={c}/>;
        });
        console.log(users);
            
        return (
            <div id="allComments" className="comments">
                {users}
            </div>
        )
    }
}

export default withRouter(UserList);