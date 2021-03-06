import React, { Component, Fragment } from 'react';

import '../../../styles/all.css';

import requester from '../../../api/requester';

import courseService from '../../../services/courseService';
import commentService from '../../../services/commentService';
import authorService from '../../../services/authorService';

import Navigation from '../../common/Navigation';
import CommentForm from '../../comment/CommentForm';
import CommentList from '../../comment/CommentList';
import AuthorDetails from '../../user/AuthorDetails';

//TODO: FINAL CHANGES
export default class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            authorId: '',
            categoryId: '',
            imageUrl: '',
            description: '',
            place: '',
            price: '',
            views: '',
            likes: '',
            createdOn: '',
            comments: [],
            categoryInfo:'',
            authorInfo:''
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
                authorService.loadAuthorById(res.authorId)
                    .then(authorInfo => {
                        requester.get('appdata', `categories/${this.state.categoryId}`, 'kinvey')
                            .then(categoryInfo => {
                                this.setState({
                                    createdOn: res._kmd.ect,
                                    authorInfo,
                                    categoryInfo,
                                    ...res
                                });
                                console.log('from course detail cdm');
                                console.log(this.state);
                            })
                    })
            })
            .catch(console.log);

        commentService.loadAllCommentsForCourse(courseId)
            .then(res => {
                this.setState({ comments: res })
            })
    }

    render = () => {
        console.log('from course details');
        console.log(this.state);
        console.log(this.props);


        return (
            <Fragment>
                <Navigation />
                <section id="viewCourseDetails">
                    <article id="courseDetails" className="course">
                        <div className="col thumbnail">
                            <img src={this.state.imageUrl} alt='url' />
                        </div>
                        <div className="course-content">
                            <div className="category">
                                <strong>{this.state.categoryInfo.name}</strong>
                            </div>
                            <div className="details">
                                {this.state.description}
                            </div>
                            <span>
                                {courseService.createdBeforeDays(this.state.createdOn)} by {this.state.author}
                            </span>
                            <AuthorDetails authorInfo={this.state.authorInfo}/>
                            <span>{this.state.price}lv for {this.state.duration}</span>

                        </div>
                    </article>

                    <CommentForm extraState={{ courseId: this.state._id }} success={this.addComment} />

                    <CommentList comments={this.state.comments} remove={this.removeComment} />

                </section>
            </Fragment>
        )
    }
}