import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Input, Form} from 'semantic-ui-react';

const PREVIOUS_INDEX=1;

export default class NameAdditionalForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            others: this.props.others
        };
    }

    handleChange = (event) =>{
        const target = event.target;
        if(target){
            this.setState({
            others: target.value
            });
        }
    }

    handlePreviousSubmit = (event) =>{
        event.preventDefault();
        this.props.saveOthersAndChangeIndex(PREVIOUS_INDEX, this.state.others);
    }

    handleValidateSubmit = (event) =>{
        event.preventDefault();
        this.props.validateForms(this.state.others)
    }

    render() {
        return (
            <div >
                <Form className="Game-form">
                    <div> Avez-vous une ou plusieurs autres propositions de prénom ? </div>
                    <div className="Game-row">
                        <Input 
                            className="Game-input"
                            type="text" 
                            name="others"
                            placeholder="Tes propositions"
                            value={this.state.others} onChange={this.handleChange}
                            />  
                    </div>
                    <div>
                        <Button 
                        style={{marginTop: '30px'}}
                        onClick={this.handlePreviousSubmit}
                        className="Form-button"> 
                            Précédent
                        </Button>
                        <Button 
                        style={{marginTop: '30px'}}
                        onClick={this.handleValidateSubmit}
                        className="Form-button"> 
                            Valider
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}