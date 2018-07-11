import React, {Component} from 'react';
import withStyle from './withStyle';

const NavigationBase = props =>(
	<nav>
		<header><span class="title">Navigation</span></header>
		<ul>
			<li><a href="#">Home</a></li>
			<li><a href="#">Catalog</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Contact Us</a></li>
		</ul>
	</nav>
);

const Navigation=withStyle(NavigationBase);
export default Navigation;
