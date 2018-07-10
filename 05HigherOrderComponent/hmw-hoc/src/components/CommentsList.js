import React,{Component} from 'react';
import dataSource from '../services/dataSource';

export default class CommentsList extends Component{
	constructor(props) {
		super(props);
		
		this.state={comments:[]};
	}

	componentDidMount(){
		this.setState({comments:dataSource.getData('comments')});
	}
	
	render(){
		return(
			<ul>
				{this.state.comments.map((c,i)=>(<li key={i}>{c}</li>) )}
			</ul>
		);
	}
}