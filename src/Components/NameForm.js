import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form} from 'semantic-ui-react';

export default class NameForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            name: ''
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

    storeName = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.login);
    }

    render() {
        return (
            <div >
                <Form onSubmit={this.storeName} className="Component-form">
                    <label className="Form-label">Rentre ton nom pour pouvoir accéder aux jeux</label>
                    <div className="Form-row">
                        <Input 
                            className="Form-input"
                            type="text" 
                            name="name"
                            placeholder="Ton nom"
                            value={this.state.name} onChange={this.handleChange}
                            required/>                    
                        <Button 
                        className="Form-button"> 
                            Valider 
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}