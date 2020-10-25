import React, { } from 'react'
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

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

        return (
        <Droppable 
            droppableId={`${index}`}
            direction={'horizontal'}
        >
        {(provided, _ ) => (
        <StyledTermRow
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    //onDragEnter={isDragging && !courseList.length?(e) => handleDragEnter(e, {termI: index, courseI: 0}):null}
                    className={isSelected?"selected-term":""}
                    scope="row"
        
                >
                    {termDisplay}
                    
                            
                    {coursesDisplay}
                    {provided.placeholder}
                    {newCourseButtonDisplay}
                </StyledTermRow>
                )}
        </Droppable>
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
