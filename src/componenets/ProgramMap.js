import React, { Component } from 'react';
import Term from './Term';
//import { v3, v4, v5 } from 'uuid'
import PropTypes from 'prop-types';
import AddTerm from './AddTerm';
import RemoveTerm from './RemoveTerm';

export class ProgramMap extends Component {

    render() {
        const rows = this.props.courses.map((courseList, index) => {
            let isSelected = false;
                if (this.props.selectedCourse){
                    isSelected = courseList.includes(this.props.selectedCourse);
                }
            
            return <tr 
            className={isSelected?"selected-term":""}
            key={index}>
            {
                <Term 
                    
                    selectedCourse={this.props.selectedCourse}
                  termNumber={index}
                  courseList={courseList}
                  handleClickAddCourse={this.props.handleClickAddCourse}
                  handleClickEditCourse={this.props.handleClickEditCourse}
                  handleClickSelectCourse={this.props.handleClickSelectCourse}
                  handleClickDeleteCourse={this.props.handleClickDeleteCourse}
                  filteredCourses={this.props.filteredCourses}
                />
            }
            </tr>;
    
        });
        return (
        <table className="courseTable"> 
            <thead>
                <tr>
                    <th>Term</th>
                    <th 
                    colSpan={this.props.maxCourseYears + 1}
                    >
                        Courses
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows}
                <tr>
                    <td 
                    key={rows.length + 1}
                    colSpan={this.props.maxCourseYears + 2}>
                    <AddTerm 
                    termNumber={rows.length + 1}
                    handleClickAddTerm={this.props.handleClickAddTerm}
                    />
                    </td>
                </tr>
                <tr>
                    <td 
                    key={rows.length + 2}
                    colSpan={this.props.maxCourseYears + 2}>
                    <RemoveTerm 
                    termNumber={rows.length - 1}
                    handleClickRemoveTerm={this.props.handleClickRemoveTerm}
                    />
                    </td>
                </tr>
            </tbody>
        </table>
        )
    }
}

// PropTypes
ProgramMap.propType = {
    handleClickAddTerm: PropTypes.func.isRequired,
    handleClickRemoveTerm: PropTypes.func.isRequired,
    handleClickAddCourse: PropTypes.func.isRequired,
    handleClickEditCourse: PropTypes.func.isRequired,
    handleClickDeleteCourse: PropTypes.func.isRequired,
    handleClickSelectCourse: PropTypes.func.isRequired,
    maxCourseYears: PropTypes.number.isRequired,
    courses: PropTypes.array.isRequired,
    selectedCourse: PropTypes.object.isRequired,
    filteredCourses: PropTypes.array.isRequired
}



export default ProgramMap
