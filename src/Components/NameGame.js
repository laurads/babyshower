import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import Modal from './Modal';
import NameRatingForm from './NameRatingForm';
import {saveNameRatings, saveNameIdeas} from '../Api/fetchApi';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

const messages = defineMessages({
    successMessage: {
      id: "NameGame.namesSavedWithSuccess",
      defaultMessage: "C'est bon c'est ds la boite, merci !!!",
    },
    errorMessage: {
        id: "NameGame.errorWhileSavingNames",
        defaultMessage: "Oups, il y a eu une erreur. Retente ta chance please !!!",
    },
});

class NameGame extends Component {
    constructor(props) {
    super(props);
        this.state = {
            names: [
                {
                    name: 'Sofia',
                    rating: 0
                },
                {
                    name: 'Donna',
                    rating: 0
                },
                {
                    name: 'Julia',
                    rating: 0
                },
                {
                    name: 'Dana',
                    rating: 0
                },
                {
                    name: 'Olivia',
                    rating: 0
                },
                {
                    name: 'Livia',
                    rating: 0
                },
                {
                    name: 'Arya',
                    rating: 0
                }
            ],
            nameGameOpen : false,
            alreadyPlayed: false
        };
    }

    toggleNameGameModal = () => {
        this.setState({
            nameGameOpen: !this.state.nameGameOpen
        });
    }

    startNameGame = () => {
        this.setState({
            nameGameOpen: true
        });
    }

    saveNamesRatingAndOther = (names, otherName) => {
        this.saveNamesInDb(names, otherName);
        this.toggleNameGameModal();
        this.setState({
            alreadyPlayed: true
        })
    }

    saveNamesInDb = (names, otherName) => {
        console.log("TO SAVE IN DB")
        console.log(names);
        console.log(otherName);
        console.log("----------------------");
        const {intl} = this.props;
        const successMessage = intl.formatMessage(messages.successMessage);
        const errorMessage = intl.formatMessage(messages.errorMessage);
        saveNameRatings(this.props.playerName, names)
        .then(result => {
            return saveNameIdeas(this.props.playerName,otherName);
        })
        .then (result => {
            this.props.displayNotification("success", successMessage);
        })
        .catch((error) => {
            console.log(error);
            this.props.displayNotification("error", errorMessage);
        });
    }

    render() {
        return (
            <div className="Game-body">
                <p>The Name Game</p>
                <p>
                    <FormattedMessage
                        id="NameGame.gameDescription"
                        defaultMessage="Aidez-nous à nous décider pour un prénom"
                    />
                </p>
                <Button 
                className="Form-button"
                disabled={this.state.alreadyPlayed}
                onClick={this.startNameGame}> 
                    <FormattedMessage
                        id="NameGame.play"
                        defaultMessage="Jouer !"
                    />
                </Button>
                <Modal 
                    show={this.state.nameGameOpen}
                    onClose={this.toggleNameGameModal}
                    title="The Name Game">
                        <NameRatingForm
                            saveNamesRatingAndOther={this.saveNamesRatingAndOther}
                            names={this.state.names}
                        />
                </Modal>
            </div>
        );
    }
}

export default injectIntl(NameGame);