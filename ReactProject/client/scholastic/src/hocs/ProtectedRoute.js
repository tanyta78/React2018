import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import c from '../api/constants';

function isUserAuthenticated(){
	if(sessionStorage.userRoles !== undefined){
		return sessionStorage.userRoles.indexOf(c.ADMIN_ROLE_ID)!== -1;
	}else{
		return false;
	}
}

const ProtectedRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={props => (
		isUserAuthenticated() ? (
			<Component {...props}{...rest} />
		) : (
			<Redirect to={{
				pathname: '/',
				state: { from: props.location }
			}} />
		)
	)
	} />
);

export default ProtectedRoute;