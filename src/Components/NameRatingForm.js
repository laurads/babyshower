import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form, Rating} from 'semantic-ui-react';

const NEXT_INDEX=2;

export default class NameRatingForm extends Component {

    handleNextSubmit = (event) =>{
        event.preventDefault();
        this.props.saveLovedNamesAndChangeIndex(NEXT_INDEX, [...this.selectedCheckboxes]);
    }

    createNameRatings = (items) => (
        items.map(this.createNameRating)
      )

    createNameRating = label => {
        return (
            <div className="Game-rating-row" key={label}>
                <div className="Game-rating-label"> {label} </div>
                <Rating
                    icon='heart' 
                    defaultRating={0} 
                    maxRating={5}
                />
            </div>
        )
    }

    render() {
        const items = [
            "Sofia",
            "Donna",
            "Julia",
            "Dana",
            "Olivia",
            "Ilona"
        ];
        return (
            <div >
                <Form onSubmit={this.handleNextSubmit} className="Game-form">
                    <div> Notez les prénoms en fonction de vos préférences </div>
                    <div className="Game-row">
                        {this.createNameRatings(items)}
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