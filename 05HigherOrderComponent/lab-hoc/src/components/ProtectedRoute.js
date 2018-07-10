import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Auth from './Auth';

function protectedRoute (allowedRoles,inRole){
	return function (WrappedComponent) { 
		return function ({role,...rest}) { 
			if(inRole(allowedRoles)){
				return <WrappedComponent {...rest}/>;
			}
			return <h1>Not Authorized</h1>;
			// this can be redirect
		};
	};
}

export default protectedRoute;

//usage
// const AdminRoute = protectedRoute(['admin'],inRole);
// const MyProtectedRoute = AdminRoute(MyComponent);

// <Route path='/admin' component={MyProtectedRoute};