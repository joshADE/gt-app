import React, { Component } from 'react'
import PropTypes from 'prop-types';
//import CourseClass from './data/CourseClass';
import AddCourse from './AddCourse';
import Course from './Course';


export class Term extends Component {
    render() {
        //console.log(this.props.filteredCourses);
        const index = this.props.termNumber;
        const termDisplay = (<td key={index + "x" + -1} style={termDisplayStyle}>{index}</td>);
        const coursesDisplay = 
        this.props.courseList.map((val, ind) => {
                        
            const highlighted = (this.props.filteredCourses.find(val1 => 
                (val1.code === val.code)) !== undefined);
                //console.log(highlighted);
            

            let isSelected = false;
                if (this.props.selectedCourse){
                    isSelected = (this.props.selectedCourse.code === val.code);
                }
            
            return (<td key={index + "x" + ind}>
                <Course 
                    term={index}
                    handleClickEditCourse={this.props.handleClickEditCourse}
                    handleClickDeleteCourse={this.props.handleClickDeleteCourse}
                    handleClickSelectCourse={this.props.handleClickSelectCourse}
                    course={val}
                    isSelected={isSelected}
                    isHighlighted={highlighted}
                    
                />
            </td>);
        });
        const newCourseButtonDisplay = (
        <td key={index + "x" + (coursesDisplay.length + 1)}>
            <AddCourse 
                term={this.props.termNumber}
                handleClickAddCourse={this.props.handleClickAddCourse}
            />
        </td>);

        return (
            
            [termDisplay, coursesDisplay, newCourseButtonDisplay]
            
        );
    }
}




// PropTypes
Term.propType = {
    courseList: PropTypes.array.isRequired,
    termNumber: PropTypes.number.isRequired,
    handleClickAddCourse: PropTypes.func.isRequired,
    handleClickEditCourse: PropTypes.func.isRequired,
    handleClickDeleteCourse: PropTypes.func.isRequired,
    handleClickSelectCourse: PropTypes.func.isRequired,
    selectedCourse: PropTypes.object.isRequired,
    filteredCourses: PropTypes.array.isRequired,
}

const termDisplayStyle = {
    textAlign:'center',
    height:'250px'
};

export default Term
