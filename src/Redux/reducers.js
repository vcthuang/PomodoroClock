// Redux dispatch types
import {
  SET_SESSION,
  SET_BREAK
} from './types';

const initialState = {
  sessionLength: 25,
  breakLength: 5
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        sessionLength: action.payload,
      }
    case SET_BREAK:
      return {
        ...state,
        breakLength: action.payload,
      }
    default:
        return state;
  }
};