import React, {Component, Fragment} from 'react';
import Navigation from './../common/Navigation';
import CourseList from './CourseList';

export default class Catalog extends Component {
    render = () => {
        return (
            <Fragment>
                <Navigation />
                <CourseList />
            </Fragment>
        )
    }
}