import React, {Component}from 'react'
import { PropTypes } from 'prop-types';

class CommentInput extends Component{
    static propTypes={
        onSubmit: PropTypes.func
    }
    constructor(){
        super()
        // 初始化CommentInput组件内的状态
        this.state = {
            username: '',
            content: ''
        }
    }

    componentWillMount(){
        // 在组件渲染前 拿到localStorage中的username
        this._loadUsername()
    }

    componentDidMount(){
        // 自动聚焦
        this.textarea.focus()
    }

    // _loadUsername 会从 LocalStorage 加载用户名并且 setState 到组件的 state.username 中
    _loadUsername(){
        const username = localStorage.getItem('username')
        if(username){
            this.setState({username})
        }
    }

    _saveUsername(username){
        localStorage.setItem('username', username)
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }

    // 在 handleUsernameBlur 中我们把用户的输入内容保存到 LocalStorage 当中：
    handleUsernameBlur(event){
        this._saveUsername(event.target.value)
    }

    // 改变评论内容数据
    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }
    /**
     * CommentInput 如何向 CommentApp 传递的数据？
     * 父组件 CommentApp 只需要通过 props 给子组件 CommentInput 传入一个回调函数。
     * 当用户点击发布按钮的时候，CommentInput 调用 props 中的回调函数并且将 state 传入该函数即可。
     */
    // handleSubmit 方法会判断 props 中是否传入了 onSubmit 属性。
    // 有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。
    // 然后再通过 setState 清空用户输入的评论内容（但为了用户体验，保留输入的用户名）
    handleSubmit(){
        if(this.props.onSubmit){
            const {username, content} = this.state
            this.props.onSubmit({
                username: username, 
                content: content, 
                createdTime: +new Date()
            })
        }
        this.setState({
            content: ''
        })
    }

    render(){
        return(
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名</span>
                    <div className="comment-field-input">
                        <input 
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            onBlur={(event) => this.handleUsernameBlur(event)}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容</span>
                    <div className="comment-field-input">
                        <textarea 
                            ref={(textarea)=>this.textarea=textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button
                    onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>                
            </div>
        )
    }
}

export default CommentInput