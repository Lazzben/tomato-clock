import React from "react";
import './countdown.css'

class CountDown extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
           timer : this.props.timer
       }
    }

    componentDidMount(){
      let timeId;
      timeId = setInterval(()=>{
        this.setState({timer: this.state.timer - 1000})
        this.state.timer < 50 && this.finish(timeId)
      }, 1000)
    }

    finish = (timeId) => {
      this.props.finish()
      clearInterval(timeId)
    }
    
    render(){
        const min = Math.floor(this.state.timer / 1000 / 60)
        const sec = Math.floor(this.state.timer / 1000 % 60)
        const time = `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
        const width = (1 - this.state.timer / this.props.duration) * 100 + '%'
        return (
          <div id="countdown">
            <span className="time">{time}</span>
            <div className="progress" style={{ width: `${width}` }} />
          </div>
        )
    }
}

export default CountDown;