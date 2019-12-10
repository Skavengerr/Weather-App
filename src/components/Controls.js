import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Checkbox } from "semantic-ui-react";

export default class Controls extends Component {
  render() {
    const { onChange, options, onRadioChange, isCelsius } = this.props;
    return (
        <div className="flex justify-between">
          <div className="w-64">
            <Dropdown
              placeholder="Select Location"
              onChange={onChange}
              selection
              options={options}
            />
          </div>
          <div className="w-64 m-auto">
            <span style={{ fontSize: 30 }} className="controls__temp mx-4">&#8451;</span>
            <Checkbox
              toggle
              fitted
              onChange={onRadioChange}
              checked={!isCelsius}
            />
            <span style={{ fontSize: 30 }} className="controls__temp mx-4">&#8457;</span>
          </div>
        </div>
    );
  }
}

Controls.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  isCelsius: PropTypes.bool.isRequired
};
