import React, { Component } from 'react';
import './ComponentStyle.css';
import { Button} from 'semantic-ui-react';
import Modal from './Modal';
import NameFavoriteForm from './NameFavoriteForm';
import NameDislikeForm from './NameDislikeForm';
import NameAdditionalForm from './NameAdditionalForm';
import NameRatingForm from './NameRatingForm';

const INITIAL_FORM_INDEX = 0;

export default class NameGame extends Component {
    constructor(props) {
    super(props);
        this.state = {
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

    saveNamesInDb = (names) => {
        const lovedNames = this.state.lovedNames;
        const dislikedNames = this.state.dislikedNames;
        const others = names;
        console.log("TO SAVE IN DB")
        console.log(lovedNames);
        console.log(dislikedNames);
        console.log(others);
        console.log("----------------------");
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
                                saveLovedNamesAndChangeIndex={this.saveLovedNamesAndChangeIndex}
                                lovedNames={this.state.lovedNames}
                            />
                        }
                        {this.state.formIndex===2 && 
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