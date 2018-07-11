import React, { Component } from 'react';
import './warning.css';

function withStyle(WrappedComponent) {
	class WithStyle extends Component {
		render() {
			return (
				<div class="alert">
					<span class="alert-symbol">&#9888;</span>
					<WrappedComponent />
				</div>
			);
		}
	}
	return WithStyle;
}

export default withStyle;
