import React, { } from 'react'
import PropTypes from 'prop-types';
import AddCourse from './AddCourse';
import Course from './Course';
import { 
    StyledTermRow,
    StyledMapHeading,
    StyledMapData
} from '../styles/components/programmapStyles';

export const Term = ({
    isSelected,
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
    getDraggingStyles,

    // focus
    toggleFocus

}) => {


        const index = termNumber;
        const termDisplay = (<StyledMapHeading key={index + "x" + -1} style={termDisplayStyle}>{index + 1}</StyledMapHeading>);
        const coursesDisplay = 
        courseList.map((val, ind) => {
                        
            const isHighlightedCourse = (filteredCourses.find(val1 => 
                (val1.code === val.code)) !== undefined);            

            const isSelectedCourse = selectedCourse && selectedCourse.code === val.code;
                
            
            return (<Course 
                        key={val.code}
                        isDragging={isDragging}
                        getDraggingStyles={getDraggingStyles}
                        handleDragStart={handleDragStart}
                        handleDragEnter={handleDragEnter}
                        termIndex={index}
                        courseIndex={ind}

                        toggleFocus={toggleFocus}
                        
                        term={index}
                        handleClickEditCourse={handleClickEditCourse}
                        handleClickDeleteCourse={handleClickDeleteCourse}
                        handleClickSelectCourse={handleClickSelectCourse}
                        course={val}
                        isSelected={isSelectedCourse}
                        isHighlighted={isHighlightedCourse}
                        
                    />);
        });
        const newCourseButtonDisplay = (
        <StyledMapData key={index + "x" + (coursesDisplay.length + 1)}>
            <AddCourse 
                term={termNumber}
                handleClickAddCourse={handleClickAddCourse}
            />
        </StyledMapData>);

        return (<StyledTermRow
                    onDragEnter={isDragging && !courseList.length?(e) => handleDragEnter(e, {termI: index, courseI: 0}):null}
                    className={isSelected?"selected-term":""}
                    scope="row"
        
                >
                    {
                    [termDisplay, coursesDisplay, newCourseButtonDisplay]
                    }
                </StyledTermRow>
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
