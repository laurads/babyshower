import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form, Input} from 'semantic-ui-react';
import NameRating from './NameRating';
import {FormattedMessage, defineMessages} from 'react-intl';

const messages = defineMessages({
    validateLabel: {
      id: "NameRatingForm.validate",
      defaultMessage: "Valider",
    },
    ideaPlaceholder: {
        id: "NameRatingForm.idea-placeholder",
        defaultMessage: "Ta proposition",
      },
});

export default class NameRatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names : this.props.names,
            other: ''
        };
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.saveNamesRatingAndOther(this.state.names, this.state.other);
    }

    handleChange = (event) =>{
        const target = event.target;
        if(target){
            this.setState({
                other: target.value
            });
        }
    }

    createNameRatings = () => (
        this.state.names.map(this.createNameRating)
    )

    createNameRating = item => {
        return (
            <div className="Game-rating-row" key={item.name}>
                <div className="Game-rating-label"> {item.name} </div>
                <NameRating
                    name={item.name}
                    updateNameRating={this.updateNameRating}
                    rating={item.rating}
                />
            </div>
        )
    }

    updateNameRating = (name, rating) => {
        let element = this.state.names.find((item) => item.name=== name);
        element.rating = rating;
    }

    render() {
        return (
            <div >
                <Form onSubmit={this.handleSubmit} className="Game-form">
                    <p>  
                        <FormattedMessage
                            id="NameRatingForm.question1"
                            defaultMessage="Notez les prénoms en fonction de vos préférences"
                        />
                    </p>
                    <div className="Game-row">
                        {this.createNameRatings()}
                    </div>
                    <p>  
                        <FormattedMessage
                            id="NameRatingForm.question2"
                            defaultMessage="As-tu une autre proposition de prénom ?"
                        />
                    </p>
                    <div className="Game-row">
                        <Input 
                            className="Game-input"
                            type="text" 
                            name="other"
                            placeholder={messages.ideaPlaceholder}
                            value={this.state.other} onChange={this.handleChange}
                            />  
                    </div>
                    <Button 
                    style={{marginTop: '10px'}}
                    className="Form-button"> 
                        {messages.validateLabel}
                    </Button>
                </Form>
            </div>
        );
    }
}