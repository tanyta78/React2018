import React, {Component} from 'react';
import withStyle from './withStyle';

const RegisterFormBase = props =>(
	<div>
		<header><span class="title">Register</span></header>
		<form>
            Username:
			<input type="text"/><br/>
            Email:
			<input type="text"/><br/>
            Password:
			<input type="password"/><br/>
            Repeat Password:
			<input type="password"/><br/>
			<input type="submit" value="Register"/>
		</form>
	</div>
);

const RegisterForm=withStyle(RegisterFormBase);
export default RegisterForm;
