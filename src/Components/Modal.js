import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component{
    
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        show: PropTypes.bool,
        children: PropTypes.node,
        title: PropTypes.node.isRequired
    };

    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="Backdrop">
                <div className="Modal">
                    <div className="Modal-header">
                        <div>
                            <img src={require('../Icons/closeIcon.png')}
                                onClick={() => {this.props.onClose();}}
                                style={{float:"right", cursor: 'pointer',}}
                                width="16" 
                                height="16" 
                                alt=""
                            />
                        </div>
                        <div  style ={{marginBottom:15, fontWeight: "bold"}}> {this.props.title} </div>
                    </div>
                    <div className="scroll" style={{margin: "20px"}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}