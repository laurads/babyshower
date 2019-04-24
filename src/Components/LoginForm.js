import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form, Image, Label} from 'semantic-ui-react';
import {checkCredentials} from '../Api/fetchApi';
import {defineMessages} from 'react-intl';

const messages = defineMessages({
    errorInputLabel: {
      id: "LoginForm.errorInputLabel",
      defaultMessage: "Dsl, le mot de passe n'est pas bon",
    },
    connectLabel: {
        id: "LoginForm.connectLabel",
        defaultMessage: "Se connecter",
    },
    placeholder: {
        id: "LoginForm.placeholder",
        defaultMessage: "La phrase magique",
    },
});

export default class LoginForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            password: '',
            invalidCredentialsMessage: ''
        };
    }

    handleChange = (event) =>{
        const target = event.target;
        if(target){
            this.setState({
            [ target.name]: target.value
            });
        }
    }
    
    login = (event) => {
        event.preventDefault();
        checkCredentials(this.state.password)
        .then(result => {
            if(result==="OK"){
                this.setState({
                    invalidCredentialsMessage: ""
                });
                this.props.loggedInValidation(true);
            }else{
                this.setState({
                    invalidCredentialsMessage: messages.errorInputLabel
                });
                this.props.loggedInValidation(false);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {invalidCredentialsMessage} = this.state;
        return (
            <div >
                <Form onSubmit={this.login} className="Login-form">
                    <div className="Form-row">
                        <Image style={{marginRight: "10px"}} className="Form-img" src='./Icons/login.png' avatar />
                        <Input 
                            className="Login-input"
                            type="text" 
                            name="password"
                            placeholder={messages.placeholder}
                            value={this.state.password} onChange={this.handleChange}
                            required/>
                            { invalidCredentialsMessage && (<Label basic color='red' pointing='left'>{ invalidCredentialsMessage }</Label>) }
                    </div>
                    <Button 
                    style={{marginTop: "30px"}}
                    className="Form-button"> 
                        {messages.connectLabel} 
                    </Button>
                </Form>
            </div>
        );
    }
}