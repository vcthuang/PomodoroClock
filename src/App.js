import React from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';

import './App.css';

import PomodoroClock from './PomodoroClock';
import BreakCom from './BreakCom';
import SessionCom from './SessionCom';
import { SET_SESSION, SET_BREAK } from './Redux/types';

store.dispatch({
  type: SET_SESSION,
  payload: 25
});

store.dispatch({
  type: SET_BREAK,
  payload: 5
});

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <header className="App-header">
          <div className = "container">
            <div className = "card bg-dark border-primary text-secondary">
              <div className = "card-header border-primary text-left text-danger">
                <h1>Pomodoro Clock</h1>
              </div>

              <div className="card-body">
                <div className = "row">  

                  <div className = "col-md-3">
                    <BreakCom />
                  </div>

                  <div className = "col-md-6">
                    <PomodoroClock />
                  </div>

                  <div className = "col-md-3">
                    <SessionCom />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;
