import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form, Image} from 'semantic-ui-react';
import {checkCredentials} from '../Api/fetchApi';


export default class LoginForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
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
        checkCredentials(this.state.login,this.state.password)
        .then(result => {
            this.props.loggedInValidation(result==="OK"?true: false);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div >
                <Form onSubmit={this.login} className="Login-form">
                    <div className="Form-row">
                        <Image style={{marginRight: "10px"}} className="Form-img" src='./Icons/login.png' avatar />
                        <Input 
                            className="Login-input"
                            type="text" 
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