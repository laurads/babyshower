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
        if (playedGame === 'NAME_GAME') {
            this.refs.DateGame.scrollIntoView({ behavior: 'smooth', alignToTop: false });
        }
        if (playedGame === 'DATE_GAME') {
            this.refs.WeightGame.scrollIntoView({ behavior: 'smooth', alignToTop: false });            
        }
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
                    <div ref="NameGame" className="Container-body-level2">
                        <NameGame 
                            playerName={this.props.playerName}
                            displayNotification={this.props.displayNotification}
                            notifyGamePlayed={this.updateGameNbPlayed}
                        />
                    </div>
                    <div ref="DateGame" className="Container-body-level2">                                    
                        <DateGame 
                            playerName={this.props.playerName}
                            displayNotification={this.props.displayNotification}
                            notifyGamePlayed={this.updateGameNbPlayed}
                        />
                    </div>
                    <div ref="WeightGame" className="Container-body-level2"> 
                    <WeightGame
                        playerName={this.props.playerName}
                        displayNotification={this.props.displayNotification}
                        notifyGamePlayed={this.updateGameNbPlayed}
                    />
                    </div>
                </div>
            );
        }
    }
}

export default GameContainer;