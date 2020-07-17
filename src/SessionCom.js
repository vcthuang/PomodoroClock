import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { setSession } from './Redux/actions';
import PropTypes from 'prop-types';

class SessionCom extends Component {
  constructor (props) {
    super (props);
    this.state = {
      sessionLength: 25
    }
  }

  componentDidMonunt() {
    this.props.setSession(this.state.sessionLength);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionLength) {
      this.setState({sessionLength: newProps.sessionLength});
    }
  }

  onIncreaseSession(e) {
    if (this.state.sessionLength < 60) {
      // update redux
      this.props.setSession(this.state.sessionLength + 1);
      // update state
      this.setState({sessionLength: this.state.sessionLength + 1 });      
    }
  }

  onDecreaseSession(e) {
    if (this.state.sessionLength > 1) {
      // update redux
      this.props.setSession(this.state.sessionLength - 1);
      // update state
      this.setState({sessionLength: this.state.sessionLength - 1 });     
    }
  }

  render() {
    
    return (
      <div className = "session">
        <div className = "card bg-warning text-center">
          <div className = "card-header border-primary text-danger" id="session-label">
            <h3>Session</h3>
          </div>
          <div className = "card-body">
            <i className="fas fa-minus pr-2"
              id="session-decrement"
              style={{color:"blue"}} 
              onClick={this.onDecreaseSession.bind(this)}>  
            </i>
            
            <span id="session-length" style={{color:"blue"}} >{this.state.sessionLength}</span>
              <i className="fas fa-plus pl-2" 
                id="session-increment"
                style={{color:"blue"}} 
                onClick={this.onIncreaseSession.bind(this)}>  
              </i>

          </div>
        </div>
      </div>
    )
  }
}

SessionCom.propTypes = {
  setSession: PropTypes.func.isRequired,
  sessionLength: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  sessionLength: state.sessionLength
});

export default connect (mapStateToProps, {setSession})(SessionCom);