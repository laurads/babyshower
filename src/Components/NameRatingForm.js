import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form} from 'semantic-ui-react';
import NameRating from './NameRating';

const NEXT_INDEX=1;

export default class NameRatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names : this.props.names,
        };
    }

    handleNextSubmit = (event) =>{
        event.preventDefault();
        this.props.saveNamesRatingAndChangeIndex(NEXT_INDEX, this.state.names);
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
                <Form onSubmit={this.handleNextSubmit} className="Game-form">
                    <div> Notez les prénoms en fonction de vos préférences </div>
                    <div className="Game-row">
                        {this.createNameRatings()}
                    </div>
                    <Button 
                    style={{marginTop: '30px'}}
                    className="Form-button"> 
                        Suivant
                    </Button>
                </Form>
            </div>
        );
    }
}