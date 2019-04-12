import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form} from 'semantic-ui-react';
import Checkbox from './Checkbox';

const PREVIOUS_INDEX=0;
const NEXT_INDEX=2;

export default class NameDislikeForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            dislikedNames: []
        };
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set(this.props.dislikedNames);
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
    }

    handlePreviousSubmit = (event) =>{
        event.preventDefault();
        this.props.saveDislikedNamesAndChangeIndex(PREVIOUS_INDEX, [...this.selectedCheckboxes]);
    }

    handleNextSubmit = (event) =>{
        event.preventDefault();
        this.props.saveDislikedNamesAndChangeIndex(NEXT_INDEX,[...this.selectedCheckboxes]);
    }

    createCheckboxes = (items) => (
        items.map(this.createCheckbox)
      )

    createCheckbox = label => {
        const checked = this.selectedCheckboxes.has(label) ? true: false;
        return (
            <Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
                checked={checked}
            />
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
                <Form className="Game-form">
                    <div> Sélectionner le(s) prénom(s), si il y en a, que vous n'aimez vraiment pas </div>
                    <div className="Game-row">
                        {this.createCheckboxes(items)}
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
                        onClick={this.handleNextSubmit}
                        className="Form-button"> 
                            Suivant
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}