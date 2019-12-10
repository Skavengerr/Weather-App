import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";

export default class TempChange extends Component {

    render() {
    const { onRadioChange, isCelsius } = this.props;
    return (
        <div>
            <span className="controls__temp text-md">&#8451;</span>
            <Checkbox
            toggle
            fitted
            onChange={onRadioChange}
            checked={!isCelsius}
            />
            <span className="controls__temp">&#8457;</span>  
        </div>
        )
    }
}