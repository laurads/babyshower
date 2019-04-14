import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form} from 'semantic-ui-react';
import {DatetimePicker} from 'rc-datetime-picker';
import moment from 'moment';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';

export default class DateForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            birthDate : moment()
        };
    }

    handleChange = (birthDate) =>{
        this.setState({
            birthDate
        });
    }

    handleValidateSubmit = (event) =>{
        event.preventDefault();
        this.props.validateForm(this.state.birthDate.format('MM/DD H:mm'))
    }

    render() {
        const months=["Jan","Fév","Mar","Avr","Mai","Juin", "Juil","Août","Sept","Oct","Nov","Déc"];
        const weeks = ["Dim","Lun","Mar","Mer", "jeu", "Ven", "Sam"];
        const currentDate = moment();
        const maxDate = moment('2019-06-20');
        return (
            <div >
                <Form onSubmit={this.handleValidateSubmit} className="Game-form">
                <div> Quand pensez-vous que bébé #3 va pointer le bout de son nez ? </div>
                <div className="Form-label-clue"> Indice : prévu le 31 Mai </div>
                <div className="Game-date">
                    <DatetimePicker
                        moment={this.state.birthDate}
                        onChange={this.handleChange}
                        months={months}
                        weeks={weeks}
                        minDate={currentDate}
                        maxDate={maxDate}
                    />    
                </div>
                <div>
                    <Button 
                        style={{marginTop: '30px'}}
                        className="Form-button"> 
                            Valider
                    </Button>
                </div>
            </Form>
            </div>
        );
    }
}