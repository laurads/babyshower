import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form, Image, Label} from 'semantic-ui-react';
import {checkCredentials} from '../Api/fetchApi';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

const messages = defineMessages({
    errorInputLabel: {
      id: "LoginForm.errorInputLabel",
      defaultMessage: "Dsl, il n'est pas magique ce mot là",
    },
    placeholder: {
        id: "LoginForm.placeholder",
        defaultMessage: "Le mot magique",
    },
});

class LoginForm extends Component {
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
        const {intl} = this.props;
        const errorMessage = intl.formatMessage(messages.errorInputLabel);
        checkCredentials(this.state.password)
        .then(result => {
            if(result==="OK"){
                this.setState({
                    invalidCredentialsMessage: ""
                });
                this.props.loggedInValidation(true);
            }else{
                this.setState({
                    invalidCredentialsMessage: errorMessage
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
        const {intl} = this.props;
        const placeholder = intl.formatMessage(messages.placeholder);
        return (
            <Form onSubmit={this.login} className="Login-form">
                <div className="Form-row">
                    <Image style={{marginRight: "10px"}} className="Form-img" src='./Icons/login.png' avatar />
                    <Input 
                        className="Login-input"
                        type="text" 
                        name="password"
                        placeholder={placeholder}
                        value={this.state.password} onChange={this.handleChange}
                        required/>
                </div>
                { invalidCredentialsMessage && (<Label className="errorLabel" basic color='red' pointing>{ invalidCredentialsMessage }</Label>) }
                <Button 
                style={{marginTop: "20px"}}
                className="Form-button"> 
                    <FormattedMessage
                        id="LoginForm.connectLabel"
                        defaultMessage="Se connecter"
                    />
                </Button>
            </Form>
        );
    }
}

export default injectIntl(LoginForm);