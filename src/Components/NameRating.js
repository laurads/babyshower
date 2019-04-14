import React, { Component} from 'react';
import {Rating} from 'semantic-ui-react';

export default class NameRating extends Component {
    state = {
        rating: this.props.rating
    }

    handleRateChange = (event, data) => {
        this.setState({
            rating : data.rating
        });
        this.props.updateNameRating(this.props.name, data.rating);
    }

    render() {
        const { rating } = this.state;

        return (
            <Rating
                    icon='heart' 
                    maxRating={5}
                    onRate={this.handleRateChange}
                    rating={rating}
                />
        );
    }
}