import * as Arborel from '../lib/arboreal';
import { buildTreeObject } from '../lib/progression';
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import CourseClass from './model/CourseClass';
import { StyledCanvasContainer, StyledCanvasNode } from '../styles/components/sideviewStyles';



function Progression(props) {
    console.log("RERENDERED");
    const prereqObject = buildTreeObject(props.prereq, props.selectedCourse.code);
    //console.log(props.prereq)
    console.log(prereqObject);
    
    var tree = Arborel.Arboreal.parse(prereqObject, 'prerequisites');
    let value = [], leafNodes = [];
    function iterator (node) {
        var depth = "", i;
        for (i = 1; i <= node.depth; i++) depth += "--";
        //console.log([depth, node.data.courseCode].join(" "));
        value.push(<span>{[depth, node.data.courseCode].join(">")}</span>);
        //value.push(node.data.courseCode);
    }


    function iteratorLeafNodes (node) {
        if (node.children.length === 0){
            leafNodes.push(node.data.courseCode);
        }
    }


    // find all the leafNodes
    tree
    .traverseDown(iteratorLeafNodes);

    tree
    //.find(node => node.data.courseCode === nodeName)
    .traverseDown(iterator);
    
    value = value.reverse()
    return (
        <div>
        <h2>Course Progression</h2>
        <StyledCanvasContainer
        >
            {value}
        </StyledCanvasContainer>
        <br />
        
        </div>
    )
}

// PropTypes
Progression.propType = {
    prereq: PropTypes.object.isRequired,
    selectedCourse: PropTypes.objectOf(CourseClass).isRequired,
}

export default Progression
