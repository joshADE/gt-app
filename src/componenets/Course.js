import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import composeRefs from "@seznam/compose-react-refs";

import CourseClass from "./model/CourseClass";
import { FormGroup, Label, Input } from "reactstrap";
import {
  StyledCourseData,
  StyledButtonDelete,
  StyledButton,
  StyledButtonSave,
  StyledCourseForm,
} from "../styles/components/programmapStyles";

export class Course extends Component {

  static propTypes = {
    courseIndex: PropTypes.number.isRequired,
    toggleFocus: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    handleClickEditCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    term: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
    handleClickDeleteCourse: PropTypes.func.isRequired,
    handleClickSelectCourse: PropTypes.func.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      courseName: this.props.course.name,
      grade: this.props.course.grade,
      credits: this.props.course.credits,
      message: "Messages here",
    };
    this.theContainer = React.createRef();
    this.theForm = React.createRef();
    this.timeout = null;
  }

  performValidation = (editedCourse) => {
    editedCourse.grade = Number(editedCourse.grade);
    editedCourse.credits = Number(editedCourse.credits);
    if (isNaN(editedCourse.grade)) {
      return 1;
    }
    if (isNaN(editedCourse.credits)) {
      return 2;
    }
    return 0;
  };

  onSubmit = (e) => {
    e.preventDefault();

    let editedCourse = new CourseClass(
      this.state.courseName,
      this.props.course.code,
      this.state.grade,
      this.state.credits
    );

    let successCode = this.performValidation(editedCourse);
    switch (successCode) {
      case 0:
        editedCourse.grade = Number(editedCourse.grade);
        editedCourse.credits = Number(editedCourse.credits);
        this.props.handleClickEditCourse(this.props.term, editedCourse);
        this.setState({ message: "Messages here" });
        break;
      case 1:
        this.setState({ message: "grade must be a number" });
        break;
      case 2:
        this.setState({ message: "credits must be a number" });
        break;
      default:
        this.setState({ message: "Messages here" });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSelect = () => {
    if (this.theContainer.current && !this.props.isSelected) {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        //console.log(this);
        // set the focus on the container element after the select button is cliked
        // and setTimeout performs this after css removes the container from view
        this.theContainer.current.focus();
        this.theContainer.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 500); // 2sec is the transition
      //alert(this.selectButton);
    }
    this.props.handleClickSelectCourse(this.props.course.code);

    this.props.toggleFocus(this.theContainer, this.props.course);
  };

  render() {
    const { courseIndex, isEditing, isHighlighted, isSelected } = this.props;
    const { code, name, grade, credits } = this.props.course;
    let appliedclasses = "course";
    appliedclasses += isHighlighted ? " highlighted" : "";
    appliedclasses += isSelected ? " selected" : "";
    return (
      <Draggable draggableId={`draggable-${code}`} index={courseIndex}>
        {(provided) => (
          <StyledCourseData
            className="course"
            isEditing={isEditing}
            ref={composeRefs(provided.innerRef, this.theContainer)}
            {...provided.draggableProps}
          >
            <StyledCourseForm
              onSubmit={this.onSubmit}
              className={appliedclasses}
              ref={this.theForm}
            >
              <span className="dragholder" {...provided.dragHandleProps} />
              {isEditing && (
                <Label style={{ alignSelf: "center" }}>
                  {this.state.message}
                </Label>
              )}
              <FormGroup>
                <span>
                  <Label>Course Code:</Label> {code}
                </span>
                <br />
                <span>
                  <Label>Name:</Label> {name}
                </span>

                <br />
                {isEditing && (
                  <span>
                    <Label for="newNameInput">New Name:</Label>{" "}
                    <Input
                      id="newNameInput"
                      className="courseInput"
                      type="text"
                      name="courseName"
                      value={this.state.courseName}
                      onChange={this.onChange}
                    />
                  </span>
                )}
                <br />
                <span>
                  <Label>Grade:</Label> {grade}
                </span>
                <br />
                {isEditing && (
                  <span>
                    <Label for="newGradeInput">New Grade:</Label>{" "}
                    <Input
                      id="newGradeInput"
                      className="courseInput"
                      type="text"
                      name="grade"
                      value={this.state.grade}
                      onChange={this.onChange}
                    />
                  </span>
                )}
                <br />
                <span>
                  <Label>Credits/Units:</Label> {credits}
                </span>
                <br />
                {isEditing && (
                  <span>
                    <Label for="newCreditInput">New Credits:</Label>{" "}
                    <Input
                      id="newCreditInput"
                      className="courseInput"
                      type="text"
                      name="credits"
                      value={this.state.credits}
                      onChange={this.onChange}
                    />
                  </span>
                )}
              </FormGroup>
              <StyledButton
                className="courseButton"
                type="button"
                onClick={this.onSelect}
              >
                {this.props.isSelected ? "Deselect" : "Select"}
              </StyledButton>
              {isEditing && (
                <>
                  <StyledButtonSave className="courseButton" type="submit">
                    Set changes
                  </StyledButtonSave>
                  <StyledButtonDelete
                    className="courseButton"
                    type="button"
                    onClick={this.props.handleClickDeleteCourse.bind(
                      this,
                      this.props.term,
                      this.props.course.code
                    )}
                  >
                    Delete(-)
                  </StyledButtonDelete>
                </>
              )}
            </StyledCourseForm>
          </StyledCourseData>
        )}
      </Draggable>
    );
  }
}


export default Course;
