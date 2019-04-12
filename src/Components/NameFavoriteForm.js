import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form} from 'semantic-ui-react';
import Checkbox from './Checkbox';

const NEXT_INDEX=1;

export default class NameFavoriteForm extends Component {

    componentWillMount = () => {
        this.selectedCheckboxes = new Set(this.props.lovedNames);
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
    }

    handleNextSubmit = (event) =>{
        event.preventDefault();
        this.props.saveLovedNamesAndChangeIndex(NEXT_INDEX, [...this.selectedCheckboxes]);
    }

    createCheckboxes = (items) => (
        items.map(this.createCheckbox)
      )

    createCheckbox = label => {
        const checked = this.selectedCheckboxes.has(label) ? true: false;
        return (<Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
                checked={checked}
            />)
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
                    <div> Sélectionner le(s) prénom(s), si il y en a, que vous aimez beaucoup </div>
                    <div className="Game-row">
                        {this.createCheckboxes(items)}
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