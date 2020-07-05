import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CourseClass from './model/CourseClass';

export class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseName: this.props.course.name,
            grade: this.props.course.grade,
            credits:this.props.course.credits,
        }
        this.selectButton = null;
    }

    
    onSubmit = (e) => {
        e.preventDefault();
        
        let editedCourse = 
        new CourseClass(this.state.courseName, this.props.course.code, this.state.grade, this.state.credits);
        
        this.props.handleClickEditCourse(this.props.term, editedCourse);
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    onSelect = (e) => {
        if(this.selectButton){
            this.selectButton.focus();
        }
        this.props.handleClickSelectCourse(this.props.course.code)
    }

    render(){
       const {code, name, grade, credits} = this.props.course;
        let appliedclasses = "course ";
        appliedclasses += this.props.isHighlighted? "highlighted " : " ";
        appliedclasses += this.props.isSelected? "selected " : " ";
       return(
            <form 
            onSubmit={this.onSubmit}
            style={courseStyle}
            className={appliedclasses}
            >
                <span>
                    <label>Course Code:</label>{' '}
                    {code}
                </span>
                <span>
                    <label>Name:</label>{' '}
                    {name}
                </span>
                <span>
                    <label>New Name:</label>{' '}
                    <input 
         
                        style={inputStyle}
                        type="text"
                        name="courseName"
                        value={this.state.courseName}
                        onChange={this.onChange}
                    />
                </span>
                <span>
                    <label>Grade:</label>{' '}
                    {grade}
                </span>
                <span>
                    <label>New Grade:</label>{' '}
                    <input 
                        style={inputStyle}
                        type="text"
                        name="grade"
                        value={this.state.grade}
                        onChange={this.onChange}
                    />
                </span>
                <span>
                    <label>Credits/Units:</label>{' '}
                    {credits}
                </span>
                <span>
                    <label>New Credits:</label>{' '}
                    <input 
                        style={inputStyle}
                        type="text"
                        name="credits"
                        value={this.state.credits}
                        onChange={this.onChange}
                    />
                </span>
                <input 
                    ref={(sButton) => {this.selectButton = sButton;}}
                    style={buttonStyle}
                    type="button"
                    value={this.props.isSelected?"Deselect":"Select"}
                    className="btn"
                    onClick={
                        this.onSelect
                    }
                />
                <input 
                    style={buttonStyle}
                    type="submit"
                    value="Set changes"
                    className="btn btn-save"
                    
                />
                <input 
                    style={buttonStyle}
                    type="button"
                    value="Delete(-)"
                    className="btn btn-delete"
                    onClick={
                        this.props.handleClickDeleteCourse.bind(this, this.props.term, this.props.course.code)
                    }
                />
                
            </form>
            
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

const inputStyle = {
    width: '100%',
    background: 'lightgrey',
    borderRadius: '5px',
    padding:'2px 4px',
}

const courseStyle = {
    display:'flex', 
    flexDirection:'column',
    borderRadius: '5px',
    fontWeight: 'bold',
    height: 'auto',
    width: 'auto',
    padding: '5px', 
};

const buttonStyle = {
    marginTop:'2px',
    borderRadius: '5px',
}

export default Course