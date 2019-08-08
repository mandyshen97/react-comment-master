import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

class CommentInput extends Component {
  // 从props拿到的属性，设置类型检查
  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUsernameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props)
    // 初始化CommentInput组件内的状态
    this.state = {
      username: props.username,  // 从 props 上取 username 字段
    }
  }

  componentDidMount() {
    // 自动聚焦
    this.textarea.focus()
  }

  // 输入用户名后 重新渲染
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  // 用户名输入框失去焦点，因为要将username数据保存到localStorage，传入父组件进行处理
  handleUsernameBlur(event) {
    if(this.props.onUsernameInputBlur){
      this.props.onUsernameInputBlur(event.target.value)
    }
  }

  // 改变评论内容数据后，重新渲染
  handleContentChange(event) {
    this.setState({
      content: event.target.value
    })
  }
  /**
   * 父组件只需要通过 props 给子组件 CommentInput 传入一个回调函数。
   * 当用户点击发布按钮的时候，CommentInput 调用 props 中的回调函数并且将 state 传入该函数即可。
   */
  // handleSubmit 方法会判断 props 中是否传入了 onSubmit 属性。
  // 有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。
  // 然后再通过 setState 清空用户输入的评论内容（但为了用户体验，保留输入的用户名）
  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({
        username: username,
        content: content,
        createdTime: +new Date()
      })
    }
    this.setState({ content: '' })
  }

  render() {
    return (
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
              ref={(textarea) => this.textarea = textarea}
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