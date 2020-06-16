import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CourseClass from './data/CourseClass';

export class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseName: this.props.course.name,
            grade: this.props.course.grade,
        }
    }

    
    onSubmit = (e) => {
        e.preventDefault();
        let editedCourse = 
        new CourseClass(this.state.courseName, this.props.course.code, this.state.grade);
        
        this.props.handleClickEditCourse(this.props.term, editedCourse);
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });


    render(){
       const {code, name, grade} = this.props.course;
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
                <input 
                    type="button"
                    value="Select"
                    className="btn"
                    onClick={
                        this.props.handleClickSelectCourse.bind(this, this.props.course.code)
                    }
                />
                <input 
                    type="submit"
                    value="Set changes"
                    className="btn btn-save"
                    
                />
                <input 
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
}

const courseStyle = {
    display:'flex', 
    flexDirection:'column',
    border: '1px solid #999',
    fontWeight: 'bold',
    height: 'auto',
    width: '15vw',
    padding: '0', 
};


export default Course