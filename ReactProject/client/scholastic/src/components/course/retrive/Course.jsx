import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import courseService from '../../../services/courseService';

export default class Course extends Component {
        
    render = () => {
        console.log('from render course');
        console.log(this.props.index);

        return(
        <article className="course">
            <div className="col rank">
                <span>{this.props.index + 1}</span>
            </div>
            <div className="col thumbnail">
                <img src={this.props.imageUrl} alt='profile' />
            </div>
            <div className="course-content">
                <div className="category">
                    {this.props.category}
                </div>
                <div className="duration">
                    <span>{this.props.price}lv for {this.props.duration}</span>
                </div>
                <div className="place">
                    <span>Education in {this.props.place}}</span>
                </div>
                <div className="details">
                    <div className="info">
                        {courseService.createdBeforeDays(this.props._kmd.ect)}
                    </div>
                    {!this.props.public &&  <div className="controls">
                        <ul>
                            <li className="action">
                                <Link to={`/course/details/${this.props._id}`}>Details</Link>
                            </li>
                            {this.props.isAuthor && 
                            <li className="action">
                                <Link to={`/course/edit/${this.props._id}`}>Edit</Link>
                            </li>}
                            {this.props.isAuthor && 
                            <li className="action">
                                <Link to={`/course/delete/${this.props._id}`} >Delete</Link>
                            </li>}
                        </ul>
                    </div>}
                   
                </div>
            </div>
        </article>
    )}
}