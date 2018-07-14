import React, {Component} from 'react';

import withFormManager from '../../hocs/withFormManager';
import commentService from '../../services/commentService';
import commentModel from '../../models/commentModel';

class CommentForm extends Component {
    render = () => {             
        return (
            <div className="submitArea">
                <div>Create Comment</div>
                <form id="createCommentForm" className="submitForm" onSubmit={this.props.handleSubmit}>
                    <label>Content:</label>
                    <input id="cmtContent" name="content" onChange={this.props.handleChange} value={this.props.content}/>
                    <input type="submit" value="Add Comment"/>
                </form>
            </div>
        )
    }
}

export default withFormManager(CommentForm, commentModel, commentService.create)