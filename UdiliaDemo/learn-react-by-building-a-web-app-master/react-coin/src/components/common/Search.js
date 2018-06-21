import React, { Component } from 'react';
import Loading from '../common/Loading';
import {API_URL} from '../../config';
import {handleResponse} from '../../helpers';
import './Search.css';

class Search extends Component {
	constructor(){
		super();

		this.state={
			searchQuery:'',
			loading:false
		};

		this.handleChange=this.handleChange.bind(this);

	}

	//controlled component recommended
	handleChange(event){
		const searchQuery = event.target.value;

		this.setState({searchQuery});
		
		//if searchQuery isn't present, don't send search request to server
		if(!searchQuery){
			return '';
		}

		this.setState({
			loading:true
		});

		fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
			.then(handleResponse)
			.then((result)=>{
				this.setState({
					loading:false
				});
			});
	}

	render() {
		const {loading} = this.state;
		return (
			<div className="Search">
				{/* //uncontrolled component - using ref
				<input ref={(input)=>this.searchQuery=input}/>
				<input ref={(input)=>this.firstname=input}/> */}
				<span className="Search-icon"/>
				<input 
					className="Search-input"
					type="text"
					placeholder="Currency name"
					onChange={this.handleChange}
				/>
				{loading &&<div className="Search-loading">
					<Loading
						width='12px'
						height='12px'
					/>
				</div>}
				
			</div>
		);
	}
}

export default Search;