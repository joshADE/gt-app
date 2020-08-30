import React, { } from 'react'
import PropTypes from 'prop-types';
import AddCourse from './AddCourse';
import Course from './Course';
import { 
    StyledMapHeading,
    StyledMapData,
    StyledMapDataAnimated
} from '../styles/components/programmapStyles';

export const Term = ({
    termNumber, 
    courseList, 
    filteredCourses, 
    selectedCourse, 
    handleClickEditCourse, 
    handleClickDeleteCourse, 
    handleClickSelectCourse, 
    handleClickAddCourse,
    // dragging props/events
    handleDragStart,
    handleDragEnter,
    isDragging,
    getDraggingStyles

}) => {


        const index = termNumber;
        const termDisplay = (<StyledMapHeading key={index + "x" + -1} style={termDisplayStyle}>{index + 1}</StyledMapHeading>);
        const coursesDisplay = 
        courseList.map((val, ind) => {
                        
            const isHighlighted = (filteredCourses.find(val1 => 
                (val1.code === val.code)) !== undefined);            

            const isSelected = selectedCourse && selectedCourse.code === val.code;
                
            
            return (
            <StyledMapDataAnimated 
                className={isDragging?getDraggingStyles({termI: index, courseI: ind}):"course"}
                onDragStart={(e) => {handleDragStart(e, {termI: index, courseI: ind})}}
                onDragEnter={isDragging?(e) => {handleDragEnter(e, {termI: index, courseI: ind})}:null}
                draggable
                key={val.code}
            >
                <Course 
                    
                    term={index}
                    handleClickEditCourse={handleClickEditCourse}
                    handleClickDeleteCourse={handleClickDeleteCourse}
                    handleClickSelectCourse={handleClickSelectCourse}
                    course={val}
                    isSelected={isSelected}
                    isHighlighted={isHighlighted}
                    
                />
            </StyledMapDataAnimated>);
        });
        const newCourseButtonDisplay = (
        <StyledMapData key={index + "x" + (coursesDisplay.length + 1)}>
            <AddCourse 
                term={termNumber}
                handleClickAddCourse={handleClickAddCourse}
            />
        </StyledMapData>);

        return (
            
            [termDisplay, coursesDisplay, newCourseButtonDisplay]
            
        );
    
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
    textAlign:'center'
};

export default Term
