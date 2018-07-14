import React, { Component } from 'react';

import City from './City';
import '../../styles/course.css';
import requester from '../../api/requester';
import AdminNavigation from '../common/AdminNavigation';

export default class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = { cities: [] }
    }

    componentDidMount() {
        requester.get('appdata', 'cities', 'kinvey').then(res => {
            this.setState({ cities: res })
        });
    }

    render = () => {

        return (
            <section id="viewCatalog">
                <AdminNavigation />
                {this.state.cities.map((p, i) => (<City key={p._id} index={i} public="true" {...p} />)

                )}
            </section>
        )
    }
}