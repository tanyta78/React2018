import React, { Component } from 'react';

import '../../styles/all.css';

import requester from '../../api/requester';

import Category from './Category';
import AdminNavigation from '../common/AdminNavigation';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] }
    }

    componentDidMount() {
        requester.get('appdata', 'categories', 'kinvey').then(res => {
            this.setState({ categories: res })
        });
    }

    render = () => {

        return (
            <section id="viewCatalog">
                <AdminNavigation />
                {this.state.categories.map((p, i) => (<Category key={p._id} index={i} public="true" {...p} />)

                )}
            </section>
        )
    }
}