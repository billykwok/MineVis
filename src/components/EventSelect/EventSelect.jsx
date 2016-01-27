import React from "react";
import Select from "react-select";

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" }
];

function logChange(val) {
  console.log("Selected: " + val);
}

class EventSelect extends React.Component {
  render() {
    return (
      <Select
        name="form-field-name"
        value="one"
        options={options}
        onChange={logChange}
      />
    );
  }
}

export default EventSelect;
