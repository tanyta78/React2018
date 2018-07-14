import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function isUserAuthenticated() {
	if (sessionStorage.userId !== undefined) {
		return true;
	} else {
		return false;
	}
}

const PrivateRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest} render={props => (
			isUserAuthenticated() ? (
				<Component {...props} {...rest} />
			) : (
				<Redirect to={{
					pathname: '/noaccess',
					state: { from: props.location }
				}} />
			)
		)} />);};
	

export default PrivateRoute;