import React, { Component } from 'react';
import './App.css';
import LoginContainer from './Containers/LoginContainer';
import MainContainer from './Containers/MainContainer';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loggedIn : false,
      };
    }

  loggedInValidation = (validated) =>{
    if(validated){
      this.setState({
        loggedIn: true,
      })
    }else{
      console.log("Erreur password");
    }
  }

  render() {
    return (
        <div className="App-body">
          {!this.state.loggedIn && 
            <LoginContainer
              loggedInValidation={this.loggedInValidation}
            />
          }
          {this.state.loggedIn && <MainContainer />}
        </div>
    );
  }
}

export default App;
