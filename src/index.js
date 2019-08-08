import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './index.css'



// 通过 commentsReducer 构建一个 store，然后让 Provider 把它传递下去
const store = createStore(commentsReducer)

ReactDOM.render(
  <Provider store={store}>
    <CommentApp/>
  </Provider>,
  document.getElementById('root')
);
