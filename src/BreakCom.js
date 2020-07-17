import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux';
import { setBreak } from './Redux/actions';
import PropTypes from 'prop-types';


class BreakCom extends Component {
  constructor (props) {
    super (props);
    this.state = {
      breakLength: 5
    }
  }

  componentDidMonunt() {
    this.props.setBreak(this.state.breakLength);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.breakLength) {
      this.setState({breakLength: newProps.breakLength});
    }
  }

  onIncreaseBreak(e) {
    if (this.state.breakLength < 5) {
      // update redux
      this.props.setBreak(this.state.breakLength+1);

      this.setState({breakLength: this.state.breakLength + 1 });      
    }
  }

  onDecreaseBreak(e) {
    if (this.state.breakLength > 1) {
      // update redux
      this.props.setBreak(this.state.breakLength - 1);

      this.setState({breakLength: this.state.breakLength - 1 });
    }
  }

  render() {
    
    return (
      <div className = "break">
        <div className = "card bg-info text-center">
          <div className = "card-header border-primary text-danger" id="break-label">
            <h3>Break</h3>
          </div>
          <div className = "card-body">
            <i className="fas fa-minus pr-2" 
              id="break-decrement"
              style={{color:"blue"}} 
              onClick={this.onDecreaseBreak.bind(this)}>  
            </i>
            
            <span id="break-length" style={{color:"blue"}}>{this.state.breakLength}</span>
              <i className="fas fa-plus pl-2"
                id="break-increment"
                style={{color:"blue"}} 
                onClick={this.onIncreaseBreak.bind(this)}>  
              </i>

          </div>
        </div>
      </div>
    )
  }
}

BreakCom.propTypes = {
  setBreak: PropTypes.func.isRequired,
  breakLength: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  breakLength: state.breakLength
});

export default connect (mapStateToProps, {setBreak})(BreakCom);
