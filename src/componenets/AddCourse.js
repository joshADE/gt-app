import React, { Component } from "react";
import PropTypes from "prop-types";
import { addCourse } from "../redux";
import { connect } from "react-redux";
import { Label, Input } from "reactstrap";
import {
  StyledButtonAdd,
  StyledAddCourseForm,
} from "../styles/components/programmapStyles";

export class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseCode: "",
      message: "Enter the course code",
    };
  }

  performValidation = (courseCode) => {
    courseCode = courseCode.trim();
    if (!courseCode) {
      return 2;
    }
    // courses is the name of the reducer, courses is also the name of the 2d array with all the course data
    let courseCodeFound = this.props.courses.courses.find(
      (courseList) =>
        courseList.find((course) => course.code === courseCode) !== undefined
    );

    if (courseCodeFound) {
      return 1;
    }
    return 0;
  };

  onSubmit = (e) => {
    e.preventDefault();

    let successCode = this.performValidation(this.state.courseCode);

    switch (successCode) {
      case 0:
        this.props.addCourse(this.props.term, this.state.courseCode);
        break;
      case 1:
        this.setState({ message: "Course code already exist" });
        break;
      case 2:
        this.setState({ message: "Invalid course code" });
        break;
      default:
        this.setState({ message: "Enter the course code" });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <StyledAddCourseForm onSubmit={this.onSubmit}>
        <Label for="addCourseInput">{this.state.message}</Label>
        <Input
          id="addCourseInput"
          className="addCourseInput"
          type="text"
          name="courseCode"
          placeholder="Course Code Here..."
          value={this.state.courseCode}
          onChange={this.onChange}
        />
        <StyledButtonAdd className="addButton" type="submit">
          Add a new course (+)
        </StyledButtonAdd>
      </StyledAddCourseForm>
    );
  }
}

// PropTypes
AddCourse.propType = {
  handleClickAddCourse: PropTypes.func.isRequired,
  term: PropTypes.number.isRequired,
};

const mapState = (state) => state;

const actionCreators = {
  addCourse,
};

export default connect(mapState, actionCreators)(AddCourse);
