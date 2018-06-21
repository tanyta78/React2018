import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Loading from '../common/Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			searchResults: [],
			searchQuery: '',
			loading: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);

	}

	//controlled component recommended
	handleChange(event) {
		const searchQuery = event.target.value;

		this.setState({ searchQuery });

		//if searchQuery isn't present, don't send search request to server
		if (!searchQuery) {
			return '';
		}

		this.setState({
			loading: true
		});

		fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
			.then(handleResponse)
			.then((result) => {
				this.setState({
					searchResults: result,
					loading: false
				});
			});
	}

	handleRedirect(currencyId){
		this.setState({
			searchQuery:'',
			searchResults:[]
		});

		this.props.history.push(`/currency/${currencyId}`);
	}

	renderSearchResults() {
		const { searchResults, searchQuery, loading } = this.state;

		if(!searchQuery){
			return '';
		}


		if (searchResults.length > 0) {
			return (
				<div className="Search-result-container">
					{searchResults.map(result => (
						<div
							key={result.id}
							className="Search-result"
							onClick={()=>this.handleRedirect(result.id)}
						>
							{result.name}({result.symbol})
						</div>
					))}
				</div>
			);
		}
		if(!loading){
			return (
				<div className="Search-result-container">
					<div className="Search-no-result">
						No results found.
					</div>
				</div>
			);
		}
	}

	render() {
		const { loading, searchQuery } = this.state;
		return (
			<div className="Search">
				{/* //uncontrolled component - using ref
				<input ref={(input)=>this.searchQuery=input}/>
				<input ref={(input)=>this.firstname=input}/> */}
				<span className="Search-icon" />
				<input
					className="Search-input"
					type="text"
					placeholder="Currency name"
					onChange={this.handleChange}
					value={searchQuery}
				/>
				{loading && <div className="Search-loading">
					<Loading
						width='12px'
						height='12px'
					/>
				</div>}
				{this.renderSearchResults()}
			</div>
		);
	}
}

export default withRouter(Search) ;