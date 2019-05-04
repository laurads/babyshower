import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button, Form, Loader} from 'semantic-ui-react';
import {DatetimePicker} from 'rc-datetime-picker';
import moment from 'moment';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

class DateForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            birthDate : moment(),
            savingInProgress: false
        };
    }

    static propTypes = {
        validateForm: PropTypes.func.isRequired,
    };

    handleChange = (birthDate) =>{
        this.setState({birthDate: birthDate});
    }

    handleValidateSubmit = (event) =>{
        event.preventDefault();
        this.props.validateForm(this.state.birthDate.format('DD/MM H:mm'));
        this.setState({savingInProgress: true});
    }

    render() {
        const months=["Jan","Fév","Mar","Avr","Mai","Juin", "Juil","Août","Sept","Oct","Nov","Déc"];
        const weeks = ["Dim","Lun","Mar","Mer", "jeu", "Ven", "Sam"];
        const currentDate = moment();
        const maxDate = moment('2019-06-20');
        return (
            <div >
                <Form onSubmit={this.handleValidateSubmit} className="Game-form">
                <p> 
                    <FormattedMessage
                        id="DateForm.question"
                        defaultMessage="Quand pensez-vous que bébé #3 va pointer le bout de son nez ?"
                    />
                </p>
                <p className="Form-label-clue"> 
                    <FormattedMessage
                        id="DateForm.clue"
                        defaultMessage="Indice : prévu le 31 Mai "
                    />
                </p>
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
                <div className="Game-row">
                    {!this.state.savingInProgress ?
                        <Button 
                            className="Form-button"> 
                                <FormattedMessage
                                    id="DateForm.validate"
                                    defaultMessage="Valider"
                                />
                        </Button>
                    :
                        <Loader active />
                    }
                </div>
            </Form>
            </div>
        );
    }
}

export default DateForm;