import React, { Component } from 'react';

import Course from './Course';
import '../../styles/course.css';
import courseService from '../../../services/courseService';

export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courses: [] 
        }
    }

    getCourses = () =>{
        let endpoint = this.props.author ? `courses?query={"author":"${sessionStorage.username}","approved":"true"}&sort={"_kmd.ect": -1}`:'courses?query={"approved":"true"}&sort={"_kmd.ect": -1}';

        courseService.loadAllApprovedCourses(endpoint)
            .then(res => {
                this.setState({ courses: res })
            });

    }
       
    componentDidMount = () => this.getCourses();

    render = () => {
        let userId=sessionStorage.getItem('userId');
        return (
            <section id="viewCatalog">
                {this.state.courses
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
                        />)
                    })}
            </section>
        )
    }
}