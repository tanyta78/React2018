import React, {Component, Fragment} from 'react';

import CourseListPublic from './CourseListPublic';

export default class CatalogPublic extends Component {
    render = () => {
        return (
            <Fragment>
                <CourseListPublic />
            </Fragment>
        )
    }
}