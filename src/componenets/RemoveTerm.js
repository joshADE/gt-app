import PropTypes from "prop-types";
import React, { Component } from "react";
import { removeTerm } from "../redux";
import { connect } from "react-redux";
import { StyledButtonDelete } from "../styles/components/programmapStyles";

export class RemoveTerm extends Component {

  static propTypes = {
    courses: PropTypes.array.isRequired,
    removeTerm: PropTypes.func.isRequired
  }

  handleClick = () => {
    if (this.props.courses.length <= 1) {
      return;
    }

    this.props.removeTerm();
  };

  render() {
    return (
      <StyledButtonDelete
        type="button"
        onClick={this.handleClick}
        className="w-100"
      >
        Remove the last term
      </StyledButtonDelete>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        courses: state.courses.courses
    }
};

const actionCreators = {
  removeTerm
};

export default connect(mapStateToProps, actionCreators)(RemoveTerm);
