import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form} from 'semantic-ui-react';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

const messages = defineMessages({
    namePlaceholder: {
        id: "NameForm.name-placeholder",
        defaultMessage: "Ton nom",
      },
});

class NameForm extends Component {
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
        const {intl} = this.props;
        const {name} = this.state;
        const placeholder = intl.formatMessage(messages.namePlaceholder);
        if(this.state.nameValidated){
            return (
                <div className="Welcome-label">
                <div className="Welcome-title">
                    <FormattedMessage
                        id="NameForm.hiTitle"
                        defaultMessage={'Salut {name}'}
                        values={{name:name }}
                    />
                </div>
                <div className="Welcome-description">  
                    <FormattedMessage
                        id="NameForm.hiDescription"
                        defaultMessage="Nous avons besoin de ton aide pour trouver un prénom pour notre baby girl, et en prime tu peux jouer pour gagner une bouteille de champagne"
                    />
                </div>
            </div>
            );
        }else{
            return (
                <Form onSubmit={this.storeName} className="Component-form">
                    <label className="Form-label">
                        <FormattedMessage
                            id="NameForm.question"
                            defaultMessage="Tape ton nom/prénom en entier ou ton surnom pour pouvoir accéder aux jeux"
                            values={{nextLine: <br/>}}
                        />
                    </label>
                    <div className="Form-row">
                        <Input 
                            className="Form-input"
                            type="text" 
                            name="name"
                            placeholder={placeholder}
                            value={this.state.name} onChange={this.handleChange}
                            required/>                    
                        <Button 
                        className="Form-button"> 
                            <FormattedMessage
                                id="NameForm.validate"
                                defaultMessage="Valider"
                            />
                        </Button>
                    </div>
                </Form>
            );
        }
    }
}

export default injectIntl(NameForm);