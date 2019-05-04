import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import WeightForm from './WeightForm';
import Modal from './Modal';
import {saveGuessWeight} from '../Api/fetchApi';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

const messages = defineMessages({
    successMessage: {
      id: "WeightGame.weightSavedWithSuccess",
      defaultMessage: "C'est bon c'est ds la boite, merci !!!",
    },
    errorMessage: {
        id: "WeightGame.errorWhileSavingWeight",
        defaultMessage: "Oups, il y a eu une erreur. Retente ta chance please !!!",
    },
});

const GAME_NAME = "WEIGHT_GAME";

class WeightGame extends Component {
    constructor(props) {
    super(props);
        this.state = {
            weightGameOpen : false,
            alreadyPlayed: false
        };
    }

    static propTypes = {
        displayNotification: PropTypes.func.isRequired,
        notifyGamePlayed: PropTypes.func.isRequired,
        playerName: PropTypes.string.isRequired
    };

    toggleWeightGameModal = () => {
        this.setState({
            weightGameOpen: !this.state.weightGameOpen
        });
    }

    startWeightGame = () => {
        this.setState({
            weightGameOpen: true
        });
    }

    validateForm = (weight) => {
        this.saveWeightInDb(weight);
    }

    saveWeightInDb = (weight) => {
        console.log("TO SAVE IN DB")
        console.log(weight);
        console.log("----------------------");
        saveGuessWeight(this.props.playerName, weight)
        .then(result => {
            this.successfullySaved();
        })
        .catch((error) =>{
            console.log(error);
            
        });
    }

    errorWhileSaving = () => {
        const errorMessage = this.props.intl.formatMessage(messages.errorMessage);
        this.props.displayNotification("error", errorMessage);
        this.toggleWeightGameModal();
    }

    successfullySaved = () => {
        const successMessage = this.props.intl.formatMessage(messages.successMessage);
        this.props.displayNotification("success", successMessage);
        this.setState({
            alreadyPlayed: true
        });
        this.props.notifyGamePlayed(GAME_NAME);
        this.toggleWeightGameModal();
    }

    render() {
        return (
            <div className="Game-body">
                <p>The Weight Game</p>
                <p>
                    <FormattedMessage
                        id="WeightGame.gameDescription"
                        defaultMessage="Devinez le poids de naissance et gagnez une bouteille de champagne"
                    />
                </p>
                <Button 
                    className="Form-button"
                    disabled={this.state.alreadyPlayed}
                    onClick={this.startWeightGame}> 
                        <FormattedMessage
                            id="WeightGame.play"
                            defaultMessage="Jouer !"
                        />
                </Button>
                <Modal 
                    show={this.state.weightGameOpen}
                    onClose={this.toggleWeightGameModal}
                    title="The Weight Game">
                    <WeightForm
                        validateForm={this.validateForm}
                    />
                </Modal>
            </div>
        );
    }
}

export default injectIntl(WeightGame);