import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import DateForm from './DateForm';
import Modal from './Modal';
import {saveGuessDate} from '../Api/fetchApi';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

const messages = defineMessages({
    successMessage: {
        id: "DateGame.dateSavedWithSuccess",
        defaultMessage: "C'est bon c'est ds la boite, merci !!!",
    },
    errorMessage: {
        id: "DateGame.errorWhileSavingDate",
        defaultMessage: "Oups, il y a eu une erreur. Retente ta chance please !!!",
    },
});

const GAME_NAME = "DATE_GAME";

class DateGame extends Component {
    constructor(props) {
    super(props);
        this.state = {
            dateGameOpen : false,
            alreadyPlayed: false
        };
    }

    static propTypes = {
        displayNotification: PropTypes.func.isRequired,
        notifyGamePlayed: PropTypes.func.isRequired,
        playerName: PropTypes.string.isRequired
    };

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
    }

    saveBirthDateInDb = (birthDate) => {
        console.log("TO SAVE IN DB")
        console.log(birthDate);
        console.log("----------------------");
        saveGuessDate(this.props.playerName, birthDate)
        .then(result => {
            this.successfullySaved();
        })
        .catch((error) =>{
            console.log(error);
            this.errorWhileSaving();
        });
    }

    errorWhileSaving = () => {
        const errorMessage = this.props.intl.formatMessage(messages.errorMessage);
        this.props.displayNotification("error", errorMessage);
        this.toggleDateGameModal();
    }

    successfullySaved = () => {
        const successMessage = this.props.intl.formatMessage(messages.successMessage);
        this.props.displayNotification("success", successMessage);
        this.setState({
            alreadyPlayed: true
        });
        this.props.notifyGamePlayed(GAME_NAME);
        this.toggleDateGameModal();
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