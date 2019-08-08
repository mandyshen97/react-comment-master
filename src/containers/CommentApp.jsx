import React, {Component}from 'react'
import CommentInputContainer from './CommentInputContainer'
import CommentListContainer from './CommentListContainer'
import HideClock from '../clock/HideClock'

class CommentApp extends Component{
    render(){
        return(
            <div className="wrapper">
                <CommentInputContainer/>
                <CommentListContainer />

                <HideClock/>
            </div>
        )
    }
}

export default CommentApp