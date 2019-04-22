import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form, Input} from 'semantic-ui-react';
import NameRating from './NameRating';


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
                    <p> Notez les prénoms en fonction de vos préférences </p>
                    <div className="Game-row">
                        {this.createNameRatings()}
                    </div>
                    <p> As-tu une autre proposition de prénom ? </p>
                    <div className="Game-row">
                        <Input 
                            className="Game-input"
                            type="text" 
                            name="other"
                            placeholder="Ta proposition"
                            value={this.state.other} onChange={this.handleChange}
                            />  
                    </div>
                    <Button 
                    style={{marginTop: '10px'}}
                    className="Form-button"> 
                        Valider
                    </Button>
                </Form>
            </div>
        );
    }
}