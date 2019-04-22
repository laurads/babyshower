import React, { Component } from 'react';
import NameGame from '../Components/NameGame';
import DateGame from '../Components/DateGame';
import WeightGame from '../Components/WeightGame';
import './ContainerStyle.css';

class GameContainer extends Component {

    render() {
        return (
            <div className="Container-body-level2">
                <NameGame 
                    playerName={this.props.playerName}
                    displayNotification={this.props.displayNotification}
                />
                <DateGame 
                    playerName={this.props.playerName}
                    displayNotification={this.props.displayNotification}
                />
                <WeightGame
                    playerName={this.props.playerName}
                    displayNotification={this.props.displayNotification}
                />
            </div>
        );
    }
}

export default GameContainer;