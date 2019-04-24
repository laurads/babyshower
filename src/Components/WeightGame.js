import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import WeightForm from './WeightForm';
import Modal from './Modal';
import {saveGuessWeight} from '../Api/fetchApi';
import {FormattedMessage, defineMessages} from 'react-intl';

const messages = defineMessages({
    successMessage: {
      id: "WeightGame.weightSavedWithSuccess",
      defaultMessage: "C'est bon c'est ds la boite, merci !!!",
    },
    errorMessage: {
        id: "WeightGame.errorWhileSavingWeight",
        defaultMessage: "Oups, il y a eu une erreur. Rentente ta chance please !!!",
    },
});

export default class WeightGame extends Component {
    constructor(props) {
    super(props);
        this.state = {
            weightGameOpen : false,
            alreadyPlayed: false
        };
    }

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
        this.toggleWeightGameModal();
        this.setState({
            alreadyPlayed: true
        })
    }

    saveWeightInDb = (weight) => {
        console.log("TO SAVE IN DB")
        console.log(weight);
        console.log("----------------------");
        saveGuessWeight(this.props.playerName, weight)
        .then(result => {
            this.props.displayNotification("success", messages.successMessage);
        })
        .catch((error) =>{
            console.log(error);
            this.props.displayNotification("error", messages.errorMessage);
        });
    }

    render() {
        return (
            <div >
                <div className="Game-body">
                    <p>The Weight Game</p>
                    <p>
                        <FormattedMessage
                            id="WeightGame.gameDescription"
                            defaultMessage="Devinez le poids de naissance de milady et gagnez une bouteille de champagne"
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
            </div>
        );
    }
}