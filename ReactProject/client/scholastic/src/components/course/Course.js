import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import courseService from '../../services/courseService';

export default class Course extends Component {
    
    render = () => {
        console.log(this.props.index);
        return(
        <article className="course">
            <div className="col rank">
                <span>{this.props.index + 1}</span>
            </div>
            <div className="col thumbnail">
                <a href={this.props.url}>
                    <img src={this.props.imageUrl} />
                </a>
            </div>
            <div className="course-content">
                <div className="title">
                    <a href={this.props.url}>
                        {this.props.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        {courseService.createdBeforeDays(this.props._kmd.ect)}
                    </div>
                    {!this.props.public &&  <div className="controls">
                        <ul>
                            <li className="action">
                                <Link to={'/catalog/details/' + this.props._id}>Details</Link>
                            </li>
                            <li className="action">
                                <Link to='/' className="editcourse">Edit</Link>
                            </li>
                            <li className="action">
                                <Link to="/" className="deletecourse">Delete</Link>
                            </li>
                        </ul>
                    </div>}
                   
                </div>
            </div>
        </article>
    )}
}