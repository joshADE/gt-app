import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import composeRefs from '@seznam/compose-react-refs'

import CourseClass from './model/CourseClass';
import { FormGroup, Label, Input } from 'reactstrap';
import { StyledCourseData , StyledButtonDelete, StyledButton, StyledButtonSave } from '../styles/components/programmapStyles';


export class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseName: this.props.course.name,
            grade: this.props.course.grade,
            credits:this.props.course.credits,
            message: 'Messages here',
        }
        this.theContainer = React.createRef();
        this.theForm = React.createRef();
        this.timeout = null;
    }

    performValidation = (editedCourse) => {
        editedCourse.grade = Number(editedCourse.grade);
        editedCourse.credits = Number(editedCourse.credits);
        if (isNaN(editedCourse.grade)){
            return 1;
        }
        if (isNaN(editedCourse.credits)){
            return 2;
        }
        return 0;
    }

    
    onSubmit = (e) => {
        e.preventDefault();
        
        let editedCourse = 
        new CourseClass(this.state.courseName, this.props.course.code, this.state.grade, this.state.credits);
        
        let successCode = this.performValidation(editedCourse);
        switch(successCode){
            case 0:
                editedCourse.grade = Number(editedCourse.grade);
                editedCourse.credits = Number(editedCourse.credits);
                this.props.handleClickEditCourse(this.props.term, editedCourse);
                this.setState({message: 'Messages here'});
                break;
            case 1:
                this.setState({message: 'grade must be a number'});
                break;
            case 2:
                this.setState({message: 'credits must be a number'});
                break;
            default:
                this.setState({message: 'Messages here'});

        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    onSelect = (e) => {
        
        if(this.theContainer.current && !this.props.isSelected){
            if (this.timeout)
                clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                //console.log(this);
                // set the focus on the container element after the select button is cliked
                // and setTimeout performs this after css removes the container from view
                this.theContainer.current.focus();
                this.theContainer.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            }, 0); // 2sec is the transition
            //alert(this.selectButton);
        }
        this.props.handleClickSelectCourse(this.props.course.code);

        this.props.toggleFocus(this.theContainer, this.props.course);

    }

    render(){
        const { termIndex, courseIndex, isEditing } = this.props;
       const {code, name, grade, credits} = this.props.course;
        let appliedclasses = "course";
        appliedclasses += this.props.isHighlighted? " highlighted" : "";
        appliedclasses += this.props.isSelected? " selected " : "";
        return(
       <Draggable
            draggableId={`draggable-${code}`}
            index={courseIndex}
       >
       {(provided, snapshot) => (
       <StyledCourseData 
                className="course"
                isEditing={isEditing}
                ref={composeRefs(provided.innerRef, this.theContainer)}
                {...provided.draggableProps}
                
            >
            <form
            onSubmit={this.onSubmit}
            style={courseStyle}
            className={appliedclasses}
            ref={this.theForm}
            >
            
                <span
                    className="dragholder" 
                    style={dragholder}
                    {...provided.dragHandleProps}
                >
                
                </span>
                {(isEditing && (
                <Label style={{alignSelf:'center'}}>
                    {this.state.message}
                </Label>))}
                <FormGroup>
                    <span>
                    <Label>Course Code:</Label>{' '}
                    {code}
                    </span>
                    <br />
                    <span>
                    <Label>Name:</Label>{' '}
                    {name}
                    </span>
                    
                    <br /> 
                    {(isEditing && (
                    <span>
                    <Label for="newNameInput">New Name:</Label>{' '}
                    <Input 
                        id="newNameInput"
                        style={inputStyle}
                        type="text"
                        name="courseName"
                        value={this.state.courseName}
                        onChange={this.onChange}
                    />
                    </span>))}
                    <br />
                    <span>
                    <Label>Grade:</Label>{' '}
                    {grade}
                    </span>
                    <br />
                    {(isEditing && (
                    <span>
                    <Label for="newGradeInput">New Grade:</Label>{' '}
                    <Input 
                        id="newGradeInput"
                        style={inputStyle}
                        type="text"
                        name="grade"
                        value={this.state.grade}
                        onChange={this.onChange}
                    />
                    </span>))}
                    <br />
                    <span>
                    <Label>Credits/Units:</Label>{' '}
                    {credits}
                    </span>
                    <br />
                    {(isEditing && (<span>
                    <Label for="newCreditInput">New Credits:</Label>{' '}
                    <Input 
                        id="newCreditInput"
                        style={inputStyle}
                        type="text"
                        name="credits"
                        value={this.state.credits}
                        onChange={this.onChange}
                    />
                    </span>))}
                </FormGroup>
                <StyledButton 
                    style={buttonStyle}
                    type="button"
                    onClick={
                        this.onSelect
                    }
                >{this.props.isSelected?"Deselect":"Select"}</StyledButton>
                {(isEditing && (<StyledButtonSave 
                    style={buttonStyle}
                    type="submit"
                >Set changes</StyledButtonSave>))}
                {(isEditing && (
                <StyledButtonDelete 
                    style={buttonStyle}
                    type="button"
                    onClick={
                        this.props.handleClickDeleteCourse.bind(this,this.props.term, this.props.course.code)
                    }
                >Delete(-)</StyledButtonDelete>))}
                
            </form>
        </StyledCourseData>
        )}
        </Draggable>
       )

         

    }
}


// PropTypes
Course.propType = {
    handleClickEditCourse: PropTypes.func.isRequired,
    course: PropTypes.instanceOf(CourseClass).isRequired,
    term: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    handleClickDeleteCourse: PropTypes.func.isRequired,
    handleClickSelectCourse: PropTypes.func.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
}
const dragholder = {
    width: '100%',
    background: 'lightgrey',
    height: '15px',
    borderRadius: '3px',
    cursor: 'grab',
    border: '1px solid black'
}

const inputStyle = {
    width: '100%',
    background: 'lightgrey',
    borderRadius: '5px',
    padding:'2px 4px',
}

const courseStyle = {
    display:'flex', 
    flexDirection:'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderRadius: '5px',
    fontWeight: 'bold',
    height: '100%',
    width: '100%',
    padding: '5px', 
};

const buttonStyle = {
    marginTop:'2px',
    borderRadius: '5px',
}

export default Course