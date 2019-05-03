import React, { Component} from 'react';
import './ComponentStyle.css';
import {FormattedMessage} from 'react-intl';

export default class GameOver extends Component {

    render() {
        return (
            <div className="Game-body">
                <div className="Gameover-img">
                    <img src={require('../Images/gameOver.jpg')} alt="game over" />
                </div>
                <p> 
                    <FormattedMessage
                        id="GameOver.message"
                        defaultMessage="Merci pour ta participation <3"
                    />
                </p>
            </div>
        );
    }
}