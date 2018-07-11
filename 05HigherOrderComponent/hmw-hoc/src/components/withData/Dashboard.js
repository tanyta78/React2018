import React from 'react';
import withData from './withData';

// usage
const Dashboard = props =>(
	<div>
		<h1>Your Dashboard</h1>
		<p>{props.data}</p>
	</div>
);
const DashboardWithData = withData(Dashboard,'Some data');

export default DashboardWithData;