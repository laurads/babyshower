import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form, Input, Loader} from 'semantic-ui-react';
import NameRating from './NameRating';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

const messages = defineMessages({
    ideaPlaceholder: {
        id: "NameRatingForm.idea-placeholder",
        defaultMessage: "Une idée ?",
      },
});

class NameRatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names : this.props.names,
            other: '',
            savingInProgress: false
        };
    }

    static propTypes = {
        saveNamesRatingAndOther: PropTypes.func.isRequired,
    };

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.saveNamesRatingAndOther(this.state.names, this.state.other);
        this.setState({savingInProgress: true});
    }

    handleChange = (event) =>{
        const target = event.target;
        if(target){
            this.setState({
                other: target.value
            });
        }
    }

    createNameRatings = () => {
        if(this.state.names){
            return this.state.names.map(this.createNameRating);
        }
    }

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
        const {intl} = this.props;
        const placeholder = intl.formatMessage(messages.ideaPlaceholder);
        return (
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
                <div className="Game-row">
                    <p>  
                        <FormattedMessage
                            id="NameRatingForm.question2"
                            defaultMessage="As-tu une autre proposition de prénom ?"
                        />
                    </p>
                    <Input 
                        className="Game-input"
                        type="text" 
                        name="other"
                        id="other"
                        placeholder={placeholder}
                        value={this.state.other} onChange={this.handleChange}
                        />  
                </div>
                <div className="Game-row">
                    {!this.state.savingInProgress ?
                        <Button 
                        className="Form-button"> 
                            <FormattedMessage
                                id="NameRatingForm.validate"
                                defaultMessage="Valider"
                            />
                        </Button>
                    :
                        <Loader active />
                    }
                </div>
            </Form>
        );
    }
}

export default injectIntl(NameRatingForm);