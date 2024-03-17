import PropTypes from "prop-types";
import React, { Component } from "react";
import { addTerm } from "../redux";
import { connect } from "react-redux";
import { StyledButtonAdd } from "../styles/components/programmapStyles";

export class AddTerm extends Component {
  static propTypes = {
    addTerm: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <StyledButtonAdd
        type="button"
        onClick={() => this.props.addTerm()}
        className="w-100"
      >
        Add a new term
      </StyledButtonAdd>
    );
  }
}


const actionCreators = {
  addTerm
};

export default connect(null, actionCreators)(AddTerm);
