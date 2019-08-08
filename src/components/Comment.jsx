import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }

    constructor() {
        super()
        this.state = {
            timeString: ''
        }
    }

    componentWillMount() {
        this._updateTimeString()
        this._timer = setInterval(() => {
            this._updateTimeString()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    _updateTimeString() {
        const comment = this.props.comment
        const duration = (new Date() - comment.createdTime) / 1000
        if (duration > 86400) {
            this.setState({ timeString: `${Math.round(duration / 60 / 60 / 24)} 天前` })
        } else if (duration > 3600) {
            this.setState({ timeString: `${Math.round(duration / 60 / 60)} 小时前` })
        } else if (duration > 60) {
            this.setState({ timeString: `${Math.round(duration / 60)} 分钟前` })
        } else {
            this.setState({ timeString: `${Math.round(Math.max(duration, 1))} 秒前` })
        }
    }

    // 把经过 this._getProcessedContent 处理的评论内容以 HTML 的方式插入到 <p> 元素中。
    // this._getProcessedContent 要把 `` 包含的内容用 <code> 包裹起来，一个正则表达式就可以做到了。
    _getProcessedContent(content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }

    render() {
        const { comment } = this.props
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{comment.username}</span>:
                </div>
                <p className="comment-content" dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(comment.content)
                }} />
                <span className="comment-createdtime">
                    {this.state.timeString}
                </span>
                <span
                    onClick={this.handleDeleteComment.bind(this)}
                    className="comment-delete"
                >
                    删除此条评论
                </span>
            </div>
        )
    }
}

export default Comment