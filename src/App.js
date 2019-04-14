import React, { Component } from 'react';
import './App.css';
import LoginContainer from './Containers/LoginContainer';
import MainContainer from './Containers/MainContainer';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loggedIn : true,
      };
    }

  render() {
    return (
        <div className="App-body">
          {!this.state.loggedIn && <LoginContainer/>}
          {this.state.loggedIn && <MainContainer />}
        </div>
    );
  }
}

export default App;
