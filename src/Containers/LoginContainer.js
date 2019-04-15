import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm';
import './ContainerStyle.css';

class LoginContainer extends Component {

    render() {
        return (
            <div className="Login-body" 
            style={{}}>
                <LoginForm 
                    style={{flex:1}}
                    loggedInValidation={this.props.loggedInValidation}
                />
            </div>
        );
    }
}

export default LoginContainer;