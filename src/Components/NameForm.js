import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form} from 'semantic-ui-react';
import {FormattedMessage, defineMessages} from 'react-intl';

const messages = defineMessages({
    validateLabel: {
      id: "NameForm.validate",
      defaultMessage: "Valider",
    },
    namePlaceholder: {
        id: "NameForm.name-placeholder",
        defaultMessage: "Ton nom",
      },
});

export default class NameForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            name: '',
            nameValidated: false
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
        this.setState({
            nameValidated: true
        })
        this.props.updatePlayerName(this.state.name);
    }

    render() {
        return (
            <div >
                {!this.state.nameValidated && 
                    <Form onSubmit={this.storeName} className="Component-form">
                        <label className="Form-label">
                            <FormattedMessage
                                id="NameForm.question"
                                defaultMessage="Rentre ton nom pour pouvoir accéder aux jeux"
                            />
                        </label>
                        <div className="Form-row">
                            <Input 
                                className="Form-input"
                                type="text" 
                                name="name"
                                placeholder={messages.namePlaceholder}
                                value={this.state.name} onChange={this.handleChange}
                                required/>                    
                            <Button 
                            className="Form-button"> 
                                {messages.validateLabel} 
                            </Button>
                        </div>
                    </Form>
                }
                {this.state.nameValidated &&
                    <div className="Welcome-label">
                        <div className="Welcome-title"> Salut {this.state.name} </div>
                        <div className="Welcome-description"> Nous avons besoin de ton aide pour trouver un prénom pour notre baby girl, et en prime tu peux jouer pour gagner une bouteille de champagne </div>
                    </div>
                }
            </div>
        );
    }
}