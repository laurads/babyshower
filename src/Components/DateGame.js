import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import DateForm from './DateForm';
import Modal from './Modal';

export default class DateGame extends Component {
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
    }

    render() {
        return (
            <div >
                <div className="Game-body">
                    <p>The Date Game</p>
                    <p>Devinez la date de l'accouchement et gagnez une bouteille de champagne</p>
                    <Button 
                    className="Form-button"
                    disabled={this.state.alreadyPlayed}
                    onClick={this.startDateGame}> 
                        Jouer ! 
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
            </div>
        );
    }
}