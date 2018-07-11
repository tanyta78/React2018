import React, {Component} from 'react';
import withStyle from './withStyle';

const TitleBase = props =>(
	<article>
		<header><span className="title">Article Title</span></header>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet magni labore voluptatibus. Vel sunt voluptate fugiat et ducimus voluptates doloremque, eum illo exercitationem dignissimos sequi cum, id molestiae debitis atque.</p>
	</article>
);

const Title=withStyle(TitleBase);
export default Title;
