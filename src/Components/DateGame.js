import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import DateForm from './DateForm';
import Modal from './Modal';
import {saveGuessDate} from '../Api/fetchApi';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

const messages = defineMessages({
    successMessage: {
      id: "DateGame.dateSavedWithSuccess",
      defaultMessage: "C'est bon c'est ds la boite, merci !!!",
    },
    errorMessage: {
        id: "DateGame.errorWhileSavingDate",
        defaultMessage: "Oups, il y a eu une erreur. Rentente ta chance please !!!",
    },
});

class DateGame extends Component {
    constructor(props) {
    super(props);
        this.state = {
            dateGameOpen : false,
            alreadyPlayed: false
        };
    }

    toggleDateGameModal = () => {
        this.setState({
            dateGameOpen: !this.state.dateGameOpen
        });
    }

    startDateGame = () => {
        this.setState({
            dateGameOpen: true
        });
    }

    validateForm = (date) => {
        this.saveBirthDateInDb(date);
        this.toggleDateGameModal();
        this.setState({
            alreadyPlayed: true
        })
    }

    saveBirthDateInDb = (birthDate) => {
        console.log("TO SAVE IN DB")
        console.log(birthDate);
        console.log("----------------------");
        const {intl} = this.props;
        const successMessage = intl.formatMessage(messages.successMessage);
        const errorMessage = intl.formatMessage(messages.errorMessage);
        saveGuessDate(this.props.playerName, birthDate)
        .then(result => {
            this.props.displayNotification("success", successMessage);
        })
        .catch((error) =>{
            this.props.displayNotification("error", errorMessage);
        });
    }

    render() {
        return (
            <div className="Game-body">
                <p>The Date Game</p>
                <p>
                    <FormattedMessage
                        id="DateGame.gameDescription"
                        defaultMessage="Devinez la date de l'accouchement et gagnez une bouteille de champagne"
                    />
                </p>
                <Button 
                className="Form-button"
                disabled={this.state.alreadyPlayed}
                onClick={this.startDateGame}> 
                    <FormattedMessage
                        id="DateGame.play"
                        defaultMessage="Jouer !"
                    />
                </Button>
                <Modal 
                    show={this.state.dateGameOpen}
                    onClose={this.toggleDateGameModal}
                    title="The Date Game">
                    <DateForm
                        validateForm={this.validateForm}
                    />
                </Modal>
            </div>
        );
    }
}

export default injectIntl(DateGame);