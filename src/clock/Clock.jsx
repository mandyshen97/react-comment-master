import React, {Component} from 'react'

class Clock extends Component{
    constructor(){
        super()
        this.state={
            date: new Date()
        }
    }

    componentWillMount(){
        this.timer=setInterval(() => {
            this.setState({date: new Date()})
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return (
            <div>
                <p>现在的时间是：</p>
                {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}

export default Clock