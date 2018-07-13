import React, {Component} from 'react'
import Comment from './Comment';

import '../../styles/comment.css'

export default class CommentList extends Component {
    render = () => {
        const comments = this.props.comments.map((c, i) => {
            return <Comment key={i} index={i} {...c} remove={this.props.remove} />;
        });
            
        return (
            <div id="allComments" className="comments">
                {comments}
            </div>
        )
    }
}