import React, { Component} from 'react';

export default class Checkbox extends Component {
    state = {
        isChecked: this.props.checked,
    }

    //static propTypes = {
      //  label: PropTypes.isRequired,
        //handleCheckboxChange: PropTypes.func.isRequired
    //}

    toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    this.setState(({ isChecked }) => ({
        isChecked: !isChecked,
    }
    ));
    handleCheckboxChange(label);
    }

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;

        return (
        <div className="Game-checkbox">
            <label>
                <input
                    type="checkbox"
                    value={label}
                    checked={isChecked}
                    onChange={this.toggleCheckboxChange}
                    className="Game-checkbox-input"
                />
                {label}
            </label>
        </div>
        );
    }
}