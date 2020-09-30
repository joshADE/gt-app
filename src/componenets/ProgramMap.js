import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    StyledTermRow,
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

    const [dragging, setDragging]  = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();
    const dispatch = useDispatch();
    //const [currentFocusedElm, setCurrentFocusedElm] = useState(null);
    //const [style, setStyle] = useState(null);
    const { currentFocusedElm, style } = useSelector(state => state.focus);
   



    const handleDragStart = (e, params) => {
        const elementAtMouse = document.elementFromPoint(e.clientX, e.clientY);
        if (!elementAtMouse.classList.contains('dragholder')){
            console.log("skipped");
            e.preventDefault();
            return;
        }
        console.log("drag started", params);
        dragItem.current = params;
        console.log(e.target);

        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        }, 0);
    }

    const handleDragEnd = () => {
        console.log("drag ended");

        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;

    }

    const handleDragEnter = (e, params) => {
        console.log("drag enter", params);
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current){
        //if (JSON.stringify(params) !== JSON.stringify(currentItem)){
            console.log("Target no the same");
            dispatch(dragEnter(params, currentItem));
            dragItem.current = params;
        }

    }

    const getDraggingStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.termI === params.termI && currentItem.courseI === params.courseI)
            return 'current'
        return 'course';
    }

    const toggleFocus = (element, focusedCourse) => {
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
        
        return <StyledTermRow 
                onDragEnter={dragging && !courseList.length?(e) => handleDragEnter(e, {termI: index, courseI: 0}):null}
                className={isSelected?"selected-term":""}
                key={index}
                scope="row"
                
                >
                    {<Term 
                    handleDragStart={handleDragStart}
                    handleDragEnter={handleDragEnter}
                    isDragging={dragging}
                    getDraggingStyles={getDraggingStyles}

                    toggleFocus={toggleFocus}

                    selectedCourse={selectedCourse}
                    termNumber={index}
                    courseList={courseList}
                    handleClickAddCourse={handleClickAddCourse}
                    handleClickEditCourse={handleClickEditCourse}
                    handleClickSelectCourse={handleClickSelectCourse}
                    handleClickDeleteCourse={handleClickDeleteCourse}
                    filteredCourses={filteredCourses}
                    />}
                </StyledTermRow>;
    });
    return (
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
        <StyledMapBody>
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
    display:'inline', 
    width:'100%', 
    height:'100%', 
    position:'relative', 
    top:'-3vmin', 
    left:'0px'
} 

const focusParentElmStyleChrome = {
    ...focusParentElmStyle,
    top: '0.1vmin',
    left: '8.0vmin'
}


export default ProgramMap
