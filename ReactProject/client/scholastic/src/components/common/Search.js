import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Loading from './Loading';
import './Search.css';
import courseService from '../../services/courseService';

//TODO: refactor code for display search result
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

		courseService.searchCourses(searchQuery)
			.then((result) => {
				this.setState({
					searchResults: result,
					loading: false
				});
			});
	}

	handleRedirect(courseId){
		this.setState({
			searchQuery:'',
			searchResults:[]
		});

		this.props.history.push(`/course/details/${courseId}`);
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
							key={result._id}
							className="Search-result"
							onClick={()=>this.handleRedirect(result._id)}
						>
							{/* TODO: what to show in search results - category,city,price,duration or Course  */}
							{result.categotyId}|({result.description})|({result.price})|({result.duration})
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
					placeholder="Course category"
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