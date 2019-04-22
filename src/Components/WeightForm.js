import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form, Input} from 'semantic-ui-react';

export default class WeightForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            weight : ''
        };
    }

    handleChange = (event) =>{
        const target = event.target;
        if(target){
            this.setState({
                weight: target.value
            });
        }
    }

    handleValidateSubmit = (event) =>{
        event.preventDefault();
        this.props.validateForm(this.state.weight);
    }

    render() {
        return (
            <div >
                <Form onSubmit={this.handleValidateSubmit} className="Game-form">
                <p> Combien pensez-vous que bébé #3 va peser à la naissance ? </p>
                <p className="Form-label-clue"> Indice : <br/> Nolan et Matis pesaient respectivement 3.450kg et 3.700kg </p>
                <div className="Form-row">
                    <Input 
                        className="Weight-input"
                        type="text" 
                        name="weight"
                        placeholder="3.500"
                        value={this.state.weight} onChange={this.handleChange}
                        required/>     
                    <div className="Form-label"> kg </div>
                </div>
                <div>
                    <Button 
                        style={{marginTop: '10px'}}
                        className="Form-button"> 
                            Valider
                    </Button>
                </div>
            </Form>
            </div>
        );
    }
}