import React, {Component} from 'react'
import Clock from './Clock'

class HideClock extends Component{
    constructor(){
        super()
        this.state={
            isShowClock: true
        }
            
    }

    handleShowOrHideClock(){
        this.setState({
            isShowClock: !this.state.isShowClock
        })
    }
    render(){
        return (
            <div>
                {this.state.isShowClock? <Clock/> : null }
                <button onClick={()=>this.handleShowOrHideClock()}>点击显示/隐藏时间</button>
            </div>
        )
    }
}

export default HideClock