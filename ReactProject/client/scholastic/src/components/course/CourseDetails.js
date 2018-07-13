import React, { Component, Fragment } from 'react';

import Navigation from '../common/Navigation';
import courseService from '../../services/courseService';
import commentService from '../../services/commentService';
import authorService from '../../services/authorService';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';

export default class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            title: '',
            imageUrl: '',
            url: '',
            description: '',
            author: '',
            createdOn: '',
            comments: []
        }
    }

    addComment = comment => {
        this.setState(prevState => {
            return { comments: [...prevState.comments, comment] }
        });
    }

    removeComment = ev => {
        let commentIndex = ev.target.getAttribute('data-comment-index');
        let comment = this.state.comments[commentIndex]
        let commentId = comment._id;
        commentService.delete(commentId)
            .then(res => {
                this.setState(prevState => {
                    prevState.comments.splice(commentIndex, 1);

                    return { comments: prevState.comments }
                })
            })
            .catch(console.log);
    }

    componentDidMount = () => {
        let courseId = this.props.match.params.id;
      
        courseService.loadCourseById(courseId)
            .then(res => {
                authorService.loadAuthorById(res.authorId).then(authorInfo=>{
                   
                    this.setState({
                            createdOn: res._kmd.ect,
                            authorInfo,
                            ...res
                        });
                    console.log(this.state);
                })
            })
            .catch(console.log);

        commentService.loadAllCommentsForCourse(courseId)
            .then(res => {
                this.setState({ comments: res })
            })
    }

    render = () => {
      
        return (
            <Fragment>
                <Navigation />
                <section id="viewPostDetails">
                    <article id="postDetails" className="post">
                        <div className="col thumbnail">
                            <img src={this.state.url} />
                        </div>
                        <div className="post-content">
                            <div className="title">
                                <strong>{this.state.title}</strong>
                            </div>
                            <div className="details">
                                {this.state.description}
                            </div>
                            <span>
                                {courseService.createdBeforeDays(this.state.createdOn)} by {this.state.author} 
                            </span>
                        </div>
                    </article>
            
                     <CommentForm extraState={{courseId: this.state._id}} success={this.addComment} /> 

                    <CommentList comments={this.state.comments} remove={this.removeComment} />

                </section>
            </Fragment>
        )
    }
}