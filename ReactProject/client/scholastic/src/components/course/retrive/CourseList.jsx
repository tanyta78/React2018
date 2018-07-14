import React, { Component } from 'react';

import Course from './Course';
import '../../../styles/course.css';
import courseService from '../../../services/courseService';

export default class CourseList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			courses: [] 
		};
	}

	componentDidMount() {
		let endpoint = this.props.author ? `courses?query={"_acl.creator":"${sessionStorage.userId}"}&sort={"_kmd.ect": -1}`:'courses?query={"approved":"true"}&sort={"_kmd.ect": -1}';

		courseService.loadAllApprovedCourses(endpoint)
			.then(res => {
				this.setState({ courses: res });
			});

	}
       
	render() {
		//let userId=sessionStorage.getItem('userId');
		return (
			<section id="viewCatalog">
				{/* {this.state.courses
					.map((p, i) => {
						let isAuthor = userId === p._acl.creator;
						console.log('is author from courselist');
						console.log(isAuthor);
                        
						return (
							<Course
								key={p._id}
								index={i}
								isAuthor={isAuthor}
								{...p} 
							/>);
                    })} */}
				{this.state.courses.map((p, i) =>
					<Course key={p._id} rank={i+1} courseId={p._id} {...p} />				
				)}
			</section>
		);
	}
}