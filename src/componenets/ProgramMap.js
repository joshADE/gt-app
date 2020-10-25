import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Term from './Term';
//import { v3, v4, v5 } from 'uuid'
import PropTypes from 'prop-types';
import AddTerm from './AddTerm';
import RemoveTerm from './RemoveTerm';
import { dragEnter, changeFocus, changeStyle } from '../redux';
import { 
    StyledMap,
    StyledMapHead,
    StyledMapBody,
    StyledMapRow,
    StyledMapRowResponsive,
    StyledMapHeading,
    StyledMapData,
    StyledFocusElement
} from '../styles/components/programmapStyles';


export const ProgramMap = ({
    courses,
    selectedCourse,
    handleClickAddCourse,
    handleClickEditCourse,
    handleClickSelectCourse,
    handleClickDeleteCourse,
    filteredCourses,
    maxCourseYears,
    handleClickAddTerm,
    handleClickRemoveTerm

}) => {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    
    const dispatch = useDispatch();
    //const [currentFocusedElm, setCurrentFocusedElm] = useState(null);
    //const [style, setStyle] = useState(null);
    const { currentFocusedElm, style } = useSelector(state => state.focus);
   

    const toggleFocus = (element, focusedCourse) => {
        console.log(element);
        if(!selectedCourse || (selectedCourse !== focusedCourse && currentFocusedElm !== element)){
            //setCurrentFocusedElm(element);
            dispatch(changeFocus(element));
        }else{
            //setCurrentFocusedElm(null);
            dispatch(changeFocus(null));
        }
    }

    
    useEffect(() => {
        if (currentFocusedElm) {
            //const style = outlineElementStyle(currentFocusedElm.current);
            //setStyle(style);
            //dispatch(changeStyle(style));
            dispatch(changeStyle());
        }
    }, [currentFocusedElm, courses]);


    const rows = courses.map((courseList, index) => {
        const isSelected = selectedCourse && (courseList.findIndex(c => c.code === selectedCourse.code) !== -1);
        
        return (<Term 
                    isSelected={isSelected}
                    key={index}
                    

                    toggleFocus={toggleFocus}

                    selectedCourse={selectedCourse}
                    termNumber={index}
                    courseList={courseList}
                    handleClickAddCourse={handleClickAddCourse}
                    handleClickEditCourse={handleClickEditCourse}
                    handleClickSelectCourse={handleClickSelectCourse}
                    handleClickDeleteCourse={handleClickDeleteCourse}
                    filteredCourses={filteredCourses}
                />
            
        );
    });
    return (
        <DragDropContext 
            onDragEnd={(param) => {
                if(param.destination){
                    dispatch(dragEnter(
                        {
                            termI: Number(param.destination.droppableId),
                            courseI: param.destination.index
                        }, 
                        {
                            termI: Number(param.source.droppableId),
                            courseI: param.source.index
                        }
                    ));
                }
                console.log(param);
            }}
        >
            <StyledMap
                responsive
                bordered
                size="sm"
                
            > 
                <StyledMapHead>
                    <StyledMapRowResponsive>
                        <StyledMapHeading>Term</StyledMapHeading>
                        <StyledMapHeading 
                        style={{width: '100%'}}
                        colSpan={maxCourseYears + 1}
                        >
                            Courses
                        </StyledMapHeading>
                    </StyledMapRowResponsive>
                </StyledMapHead>
                <StyledMapBody style={{width: '100%', height:'100%'}}>
                    <tr style={isChrome?focusParentElmStyleChrome:focusParentElmStyle}>
                        <StyledFocusElement 
                            className={`${selectedCourse && currentFocusedElm ? `active` : ``}`}
                            style={style}
                        />
                    </tr>
                    {rows}
                    <StyledMapRow>
                        <StyledMapData
                        style={{width: '100%'}} 
                        key={rows.length + 1}
                        colSpan={maxCourseYears + 2}>
                        <AddTerm 
                        termNumber={rows.length + 1}
                        handleClickAddTerm={handleClickAddTerm}
                        />
                        </StyledMapData>
                    </StyledMapRow>
                    <StyledMapRow>
                        <StyledMapData 
                        style={{width: '100%'}}
                        key={rows.length + 2}
                        colSpan={maxCourseYears + 2}>
                        <RemoveTerm 
                        termNumber={rows.length - 1}
                        handleClickRemoveTerm={handleClickRemoveTerm}
                        />
                        </StyledMapData>
                    </StyledMapRow>
                </StyledMapBody>
            </StyledMap>
    </DragDropContext>
    )
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

const focusParentElmStyle = {
    
    position: 'relative', 
    width:'100%', 
    height:'100%', 
    position:'relative', 
    top:'-4vmin', 
    left:'0px'
} 

const focusParentElmStyleChrome = {
    ...focusParentElmStyle,
    display:'inline',
    
}


export default ProgramMap
