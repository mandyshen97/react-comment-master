import React, {Component}from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import HideClock from './clock/HideClock'

class CommentApp extends Component{
    constructor(){
        super()
        this.state = {
            comments:[]
        }
    }

    componentWillMount(){
        // 在组件渲染前 拿到localStorage中的comments
        this._loadComments()
    }

    // 持久化存储, 数组转字符串
    _savaComments(comments){
        localStorage.setItem('comments', JSON.stringify(comments))
    }

    _loadComments(){
        let comments= localStorage.getItem('comments')
        if(comments){
            comments = JSON.parse(comments)
            this.setState({comments})
        }
    }

    handleSubmitComment(comment){
        if(!comment) return
        if(!comment.username){
            return alert('请输入用户名')
        }
        if(!comment.content){
            return alert('请输入评论内容')
        }
        const comments = this.state.comments
        comments.unshift(comment)
        this.setState({
            comments: comments
        })
        // 持久化存储
        this._savaComments(comments)
    }

    handleDeleteComment(index){
        alert(index)
    }

    render(){
        return(
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                />

                <HideClock/>
            </div>
        )
    }
}

export default CommentApp