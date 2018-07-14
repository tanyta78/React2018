import React, { Component } from 'react';

import Course from './Course';
import '../../../styles/course.css';
import courseService from '../../../services/courseService';

export default class CourseListPublic extends Component {
    constructor(props) {
        super(props);
        this.state = { courses: [] }
    }

    getCourses = () =>
        courseService.loadAllApprovedCourses()
            .then(res => {
               this.setState({ courses: res })
            });

    componentDidMount = () => this.getCourses();

    render = () => {
        
        return (
            <section id="viewCatalog">
                {this.state.courses.map((p, i) => <Course key={p._id} index={i} public="true" {...p} />)}
            </section>
        )
    }
}