import React, { Component, createRef } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSession, setBreak } from './Redux/actions';

class PomodoroClock extends Component {
  constructor (props) {
    super (props);
    this.state = {
      runningSession: true,
      isRunning: false,
      time: {
        m: 25,
        s: 0
      },
      seconds: 1500 //25*60
    };
    this.audioRef = createRef();
    this.timer = 0;
    this.startStop = this.startStop.bind(this);
    this.countDown = this.countDown.bind(this);
    this.reset = this.reset.bind(this);
  }

  secondsToTime (secs) {
    let minutes = Math.floor(secs /60);
    let divisorForSecond = secs % 60;
    let seconds = Math.ceil(divisorForSecond);

    let obj = {
      "m": minutes,
      "s": seconds
    };

    return obj;
  }

  componentDidMonunt() {
    let timeLeft = this.secondsToTime(this.props.sessionLength * 60);
    this.setState ({time: timeLeft});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionLength && this.state.runningSession) {
      this.setState({
        time: this.secondsToTime(newProps.sessionLength * 60),
        seconds: newProps.sessionLength * 60
      });
    }
    if (newProps.breakLength && !this.state.runningSession) {
      this.setState({
        time: this.secondsToTime(newProps.breakLength * 60),
        seconds: newProps.breakLength * 60
      });
    }
  }

  startStop() {
    if (!this.state.isRunning) {
      //if (this.timer === 0 && this.state.seconds > 0)
      this.timer = setInterval (this.countDown, 1000);
      this.setState({isRunning: true});
    } else {
      this.setState({isRunning: false});
      clearInterval(this.timer);
    }
  }

  reset() {
    this.setState({
      runningSession: true,
      isRunning: false,
      time:  {
        m: 25,
        s: 0
      },
      reset: true,
      seconds: 1500
    });
    clearInterval(this.timer);
    this.timer = 0;
    this.props.setSession(25);
    this.props.setBreak(5);
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
      reset: false
    });

    if (seconds < 0) {
      if (this.state.runningSession) {
        this.setState({
          runningSession : !this.state.runningSession,
          time: this.secondsToTime(this.props.breakLength * 60),
          seconds: this.props.breakLength * 60,
          reset: false
        });
      } else {
        this.setState({
          runningSession : !this.state.runningSession,
          time: this.secondsToTime(this.props.sessionLength * 60),
          seconds: this.props.sessionLength * 60,
          reset: false
        });
      }
      //clearInterval(this.timer);
      //this.timer = 0;
    } else if (seconds === 0) {
      this.audioRef.current.play();
    }
  }

  render() {
       
    let content;
    if (this.state.runningSession) {
      content = (
        <div>
          <h3 id="timer-label">Running Session...</h3>
        </div>
      )
    } else {
      content = (
        <div>
          <h3 id="timer-label">Running Break...</h3>
        </div>
      )
    }

    let timeDisplay;
    if (this.state.time.m < 10)
      timeDisplay = "0" + this.state.time.m + " : ";
    else 
      timeDisplay = this.state.time.m + " : ";
    
    if (this.state.time.s < 10)
      timeDisplay = timeDisplay + "0" + this.state.time.s.toString();
    else 
      timeDisplay = timeDisplay + this.state.time.s.toString();

    return (
      <div className = "timer">
        {content}
        <h1 id="time-left" style={{color:"yellow"}}>{timeDisplay}</h1>
        <i className="fas fa-toggle-on pr-5" style={{color:"blue"}} id="start-stop" onClick={this.startStop}></i>
        <i className="fas fa-power-off pl-5" style={{color:"red"}}  id="reset" onClick={this.reset}></i>

        <audio ref = {this.audioRef}
          id = "beep"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
        >
        </audio>
      </div>
    )
  }
}

PomodoroClock.propTypes = {
  setSession: PropTypes.func.isRequired,
  setBreak: PropTypes.func.isRequired,
  sessionLength: PropTypes.number.isRequired,
  breakLength: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  sessionLength: state.sessionLength,
  breakLength: state.breakLength
})

export default connect (mapStateToProps, {setSession, setBreak})(PomodoroClock);
