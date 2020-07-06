// Redux dispatch types
import {
  SET_SESSION,
  SET_BREAK
} from './types';

export const setSession = sessionLength => dispatch => {
  dispatch({
    type: SET_SESSION,
    payload: sessionLength
  })    
}

export const setBreak = breakLength => dispatch => {
  dispatch({
    type: SET_BREAK,
    payload: breakLength
  })    
}