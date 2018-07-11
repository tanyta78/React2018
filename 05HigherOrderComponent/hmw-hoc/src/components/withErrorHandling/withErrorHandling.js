import React,{Component} from 'react';

function withErrorHandling(WrappedComponent) {
	class ErrorBoundary extends Component {
		constructor(props) {
			super(props);
			this.state = {  error: null, errorInfo: null };
		}
		
		componentDidCatch(error, info) {
			// Display fallback UI
			this.setState({ error: error , errorInfo: info});
			
		}
		
		render() {
			if (this.state.errorInfo) {
				// Error path
				return (
					<div>
						<h2>Something went wrong.</h2>
						<details style={{ whiteSpace: 'pre-wrap' }}>
							{this.state.error && this.state.error.toString()}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					</div>
				);
			}
			// Normally, just render children
			return this.props.children;
		}  
	}
		
	
	class WithErrorHandling extends Component{
		render(){
			return(
				<ErrorBoundary>
					<WrappedComponent/>
				</ErrorBoundary>
			);
			
		}
	}
	return WithErrorHandling;
}

export default withErrorHandling;