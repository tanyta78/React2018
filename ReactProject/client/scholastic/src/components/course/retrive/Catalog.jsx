import React, {Component, Fragment} from 'react';
import Navigation from '../../common/Navigation';
import CourseList from './CourseList';

export default class Catalog extends Component {
	render () {
		console.log('from catalog');
		console.log(this.props);
		return (
			<div>
				<Navigation />
				<CourseList author={this.props.author}/>
			</div>
		);
	}
}