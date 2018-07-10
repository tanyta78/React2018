import React, { Component } from 'react';

function withData(WrappedComponent, data) {
	class WithData extends Component {
		render() {
			return <WrappedComponent data={data} />;
		}
	}
	return WithData;
}

export default withData;
