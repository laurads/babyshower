import React, { Component } from 'react';
import NameGame from '../Components/NameGame';
import DateGame from '../Components/DateGame';
import './ContainerStyle.css';

class GameContainer extends Component {

    render() {
        return (
            <div className="Container-body">
                <NameGame 
                    displayNotification={this.props.displayNotification}
                />
                <DateGame 
                    displayNotification={this.props.displayNotification}
                />
            </div>
        );
    }
}

export default GameContainer;