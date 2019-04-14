import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import Modal from './Modal';
import NameAdditionalForm from './NameAdditionalForm';
import NameRatingForm from './NameRatingForm';

const INITIAL_FORM_INDEX = 0;

export default class NameGame extends Component {
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
                    name: 'Ilona',
                    rating: 0
                }
            ],
            lovedNames : [],
            dislikedNames: [],
            others: '',
            nameGameOpen : false,
            formIndex: INITIAL_FORM_INDEX,
            alreadyPlayed: false
        };
    }

    toggleNameGameModal = () => {
        if(this.state.nameGameOpen){
            this.resetParams();
        }
        this.setState({
            nameGameOpen: !this.state.nameGameOpen
        });
    }

    startNameGame = () => {
        this.setState({
            nameGameOpen: true
        });
    }

    saveNamesRatingAndChangeIndex = (index, names) => {
        this.setState({
            formIndex: index,
            names: names
        });
    }

    saveLovedNamesAndChangeIndex = (index, names) =>{
        this.setState({
            formIndex: index,
            lovedNames: names
        });
    }

    saveDislikedNamesAndChangeIndex = (index, names) =>{
        this.setState({
            formIndex: index,
            dislikedNames: names
        });
    }

    saveOthersAndChangeIndex = (index, names) =>{
        this.setState({
            formIndex: index,
            others: names
        });
    }

    validateForms = (names) => {
        this.saveNamesInDb(names);
        this.toggleNameGameModal();
        this.setState({
            alreadyPlayed: true
        })
    }

    resetParams = () => {
        this.setState({
            lovedNames : [],
            dislikedNames: [],
            others: '',
            formIndex: INITIAL_FORM_INDEX
        });
    }

    saveNamesInDb = (otherNames) => {
        const names = this.state.names;
        const others = otherNames;
        console.log("TO SAVE IN DB")
        console.log(names);
        console.log(others);
        console.log("----------------------");
        this.props.displayNotification("success", "C'est bon c'est ds la boite, merci !!!");
        this.props.displayNotification("error", "Oups, il y a eu une erreur. Rentente ta chance please !!!");
    }

    render() {
        return (
            <div >
                <div className="Game-body">
                    <p>The Name Game</p>
                    <p>Aidez-nous à nous décider pour un prénom</p>
                    <Button 
                    className="Form-button"
                    disabled={this.state.alreadyPlayed}
                    onClick={this.startNameGame}> 
                        Jouer ! 
                    </Button>
                    <Modal 
                        show={this.state.nameGameOpen}
                        onClose={this.toggleNameGameModal}
                        title="The Name Game">
                        {this.state.formIndex===0 && 
                            <NameRatingForm
                                saveNamesRatingAndChangeIndex={this.saveNamesRatingAndChangeIndex}
                                names={this.state.names}
                            />
                        }
                        {this.state.formIndex===1 && 
                            <NameAdditionalForm
                                saveOthersAndChangeIndex={this.saveOthersAndChangeIndex}
                                validateForms={this.validateForms}
                                others={this.state.others}
                            />
                        }
                    </Modal>
                </div>
            </div>
        );
    }
}