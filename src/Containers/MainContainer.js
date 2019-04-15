import React, { Component } from 'react';
import Header from '../Components/Header';
import GameContainer from './GameContainer';
import NameForm from '../Components/NameForm';
import './ContainerStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import './NotificationsStyle.css';

class MainContainer extends Component {
    constructor(props) {
        super(props);
            this.state = {
                playerName: '',
            };
        }

    displayNotification = (level, message) => {
        if(level === "success"){
            toast.success(
                <div style ={{textAlign:'center'}}>
                    {message}
                </div>
            );
        }else if(level === "error"){
            toast.error(
                <div style ={{textAlign:'center'}}>
                    {message}
                </div>
            );
        }else{
            toast.info(
                <div style ={{textAlign:'center'}}>
                    {message}
                </div>
            );
        }
    }

    updatePlayerName = (playerName) => {
        this.setState({
            playerName: playerName
        })
    }

    render() {
        return (
            <div className="Container-body">
                <Header/>
                <NameForm 
                    displayNotification={this.displayNotification}
                    updatePlayerName={this.updatePlayerName}
                />
                {this.state.playerName !== '' && 
                    <GameContainer 
                        displayNotification={this.displayNotification}
                        playerName={this.state.playerName}
                    /> 
                }
                <ToastContainer 
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable={false}
                    pauseOnHover={false}
                />
            </div>
        );
    }
}

export default MainContainer;