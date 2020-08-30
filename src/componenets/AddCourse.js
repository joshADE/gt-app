import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { addCourse } from '../redux'
import { connect } from 'react-redux';
import { Form, Label, Input } from 'reactstrap';
import { StyledButtonAdd } from '../styles/components/programmapStyles';

export class AddCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            courseCode: '',
            message:'Enter the course code'
        }
    }

    performValidation = (courseCode) => {
            courseCode = courseCode.trim();
            if (!courseCode){
                return 2;
            }
            let termList = this.props.courses.slice();
            let courseCodeFound = termList
                .find(courseList => courseList
                .find(course => course.code === courseCode) !== undefined);

            if (courseCodeFound){
                return 1;
            }
            return 0;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.courseCode){
            this.setState({
                message: "Must enter course code"
            });
        }else{
            let successCode = this.performValidation(this.state.courseCode);
            
            switch(successCode){
                case 0:
                    this.props.addCourse(this.props.term,this.state.courseCode);
                    break;
                case 1:
                    this.setState({message: 'Course code already exist'});
                    break;
                case 2:
                    this.setState({message: 'Invalid course code'});
                    break;
                default:
                    this.setState({message:'Enter the course code'});

            }
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    render() {
        
        return (
      
            <Form
            onSubmit={this.onSubmit}
            style={addCourseStyle}
            >
            <Label for="addCourseInput">{this.state.message}</Label>
                <Input 
                    id="addCourseInput"
                    style={inputStyle}
                    type="text"
                    name="courseCode"
                    placeholder="Course Code Here..."
                    value={this.state.courseCode}
                    onChange={this.onChange}

                />
                <StyledButtonAdd 
                    style={buttonStyle}
                    type="submit"
                 >Add a new course (+)</StyledButtonAdd>
            </Form>
        
        )
    }
}


// PropTypes
AddCourse.propType = {
    handleClickAddCourse: PropTypes.func.isRequired,
    term: PropTypes.number.isRequired,
}


const addCourseStyle = {
    display:'flex', 
    flexDirection:'column',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    height: 'auto',
    minHeight: '300px',
    width: '100%',
}

const buttonStyle = {
    marginTop:'2px',
    // borderRadius: '5px',
}

const inputStyle = {
    marginTop:'2px',
    // borderRadius: '5px',
    // padding:'2px 4px',
}

const mapStateToProps = state => {
    return {
      courses: state.courses.courses
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      addCourse: (term, courseCode) => dispatch(addCourse(term, courseCode))
    }
  }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCourse)
