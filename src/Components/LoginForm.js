import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form, Image} from 'semantic-ui-react';

export default class LoginForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            login: '',
            password: ''
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
        alert('A name was submitted: ' + this.state.login);
    }

    render() {
        return (
            <div >
                <Form onSubmit={this.login} className="Component-form">
                    <div className="Form-row">
                        <Image style={{marginRight: "15px"}} className="Form-img" src='./Icons/login.png' avatar />
                        <Input 
                            className="Form-input"
                            type="text" 
                            name="login"
                            placeholder="login"
                            value={this.state.login} onChange={this.handleChange}
                            required/>
                    </div>
                    <div className="Form-row">
                        <Image style={{marginRight: "15px"}} src='../Icons/password.png' avatar />
                        <Input 
                            className="Form-input"
                            type="password" 
                            name="password"
                            placeholder="password"
                            value={this.state.password} onChange={this.handleChange}
                            required/>
                    </div>
                    <Button 
                    style={{marginTop: '30px'}}
                    className="Form-button"> 
                        Se connecter 
                    </Button>
                </Form>
            </div>
        );
    }
}