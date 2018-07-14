import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import courseService from '../../../services/courseService';
import requester from '../../../api/requester';

export default class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryName: ''
        }
    }


    componentDidMount = () => {
        let categoryId = this.props.categoryId;
        requester.get('appdata', `categories/${categoryId}`, 'kinvey')
            .then(res => {
                console.log(res);
                let categoryName = res.name;
                console.log(categoryName);
                this.setState({ categoryName })
            })

    }

    isAuthor(){
		console.log(this.props);
		return this.props._acl.creator===sessionStorage.userId;
	}


    render = () => {
        let approvedSymbol ;
        if(this.props.approved === 'true' ) {
        approvedSymbol=(<span> &#9745;</span>);
        } else {
        approvedSymbol=(<span> &#9746;</span>);
        } 
        return (
            <article className="course">
                <div className="col rank">
                    <span>{this.props.index + 1}</span>
                </div>
                <div className="col thumbnail">
                    <img src={this.props.imageUrl} alt='profile' />
                </div>
                <div className="course-content">
                    <div className="category">
                        {this.state.categoryName}
                    </div>
                    <div className="duration">
                        <span>{this.props.price}lv for {this.props.duration}</span>
                    </div>
                    <div className="place">
                        <span>Education in {this.props.place}</span>
                    </div>
                    <div className="details">
                        <div className="info">
                            {courseService.createdBeforeDays(this.props._kmd.ect)}
                        </div>
                        {!this.props.public && <div className="controls">
                            <ul>
                                <li className="action">
                                    <Link to={`/course/details/${this.props._id}`}>Details</Link>
                                </li>
                                {this.isAuthor() && 
                                    <li className="action">
                                        <Link to={`/course/edit/${this.props._id}`}>Edit</Link>
                                    </li>}
                                    {this.isAuthor() && 
                                    <li className="action">
                                        <Link to={`/course/delete/${this.props._id}`} >Delete</Link>
                                    </li>}
                                    {this.isAuthor() && 
                                    <li className="action">
                                        Approved {approvedSymbol}
                                    </li>}
                            </ul>
                        </div>}

                    </div>
                </div>
            </article>
        )
    }
}