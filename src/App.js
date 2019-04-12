import React, { Component } from 'react';
import './App.css';
import LoginContainer from './Containers/LoginContainer';
import MainContainer from './Containers/MainContainer';


class App extends Component {

  render() {
    return (
        <div className="App-body">
          {/*<LoginContainer/> */}
          <MainContainer />
        </div>
    );
  }
}

export default App;
