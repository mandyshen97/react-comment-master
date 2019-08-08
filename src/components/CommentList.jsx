import React, { Component } from "react";
import Comment from './Comment'
import PropTypes from 'prop-types'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }
    // 防止comments不传入的情况下报错
    static defaultProps={
        comments: []
    }

    handleDeleteComment(index){
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        const {comments} = this.props
        console.log(comments,'---------')
        return (
            <div className="comment-list">
                {comments.map((comment, i) =>
                    <Comment 
                        comment={comment} 
                        key={i} 
                        index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)}
                    />
                )}
            </div>
        );
    }
}

export default CommentList;
