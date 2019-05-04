import React, { Component } from 'react';
import NameGame from '../Components/NameGame';
import DateGame from '../Components/DateGame';
import WeightGame from '../Components/WeightGame';
import GameOver from '../Components/GameOver';
import './ContainerStyle.css';
import PropTypes from 'prop-types';

const GAMES_NB = 3;

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playedGames:[],
        };
    }

    static propTypes = {
        displayNotification: PropTypes.func.isRequired,
        playerName: PropTypes.string.isRequired,
        notifyGameOver: PropTypes.func.isRequired
    };

    updateGameNbPlayed = (playedGame) => {
        const playedGames = this.state.playedGames
        if(!playedGames.includes(playedGame)){
            playedGames.push(playedGame);
            this.setState({
                playedGames: playedGames
            });
            if(playedGames.length === GAMES_NB){
                this.props.notifyGameOver();
            }
        }
    }

    render() {
        if(this.state.playedGames.length === GAMES_NB){
            return (
                <GameOver />
            );
        }
        else {
            return (
                <div className="Container-body-level2">
                    <NameGame 
                        playerName={this.props.playerName}
                        displayNotification={this.props.displayNotification}
                        notifyGamePlayed={this.updateGameNbPlayed}
                    />
                    <DateGame 
                        playerName={this.props.playerName}
                        displayNotification={this.props.displayNotification}
                        notifyGamePlayed={this.updateGameNbPlayed}
                    />
                    <WeightGame
                        playerName={this.props.playerName}
                        displayNotification={this.props.displayNotification}
                        notifyGamePlayed={this.updateGameNbPlayed}
                    />
                </div>
            );
        }
    }
}

export default GameContainer;