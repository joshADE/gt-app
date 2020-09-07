import * as Arborel from '../lib/arboreal';
import { buildTreeObject } from '../lib/progression';
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import CourseClass from './model/CourseClass';
import { StyledCanvasContainer, StyledCanvasNode } from '../styles/components/sideviewStyles';

function Node(props) {
    const {ctx, x, y, radius, text} = props;
    
    if (props.parentX && props.parentY){
        ctx.moveTo(x, y);
        ctx.lineTo(props.parentX, props.parentY);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillText(text, x, y);
    console.log("RERENDERED");
}


function Progression(props) {
    const prereqObject = buildTreeObject(props.prereq, props.selectedCourse.code);
    //console.log(props.prereq)
    //console.log(prereqObject);
    
    console.log("RERENDERED PROGRESSION");
    var tree = Arborel.Arboreal.parse(prereqObject, 'prerequisites');
    let value = [], leafNodes = [];
    let maxDepth = 0;
    let maxSiblingCount = 1;
    let nodeRadius = 20;
    let distanceBetweenNodes = nodeRadius * 2 + 1;
    let theCanvas = useRef(null);
    let theContainer = useRef(null);
    
    tree.traverseDown(node => {
        if (node.depth > maxDepth){
            maxDepth = node.depth;
        }
        if (node.children.length > maxSiblingCount){
            maxSiblingCount = node.children.length;
        }
    });
    let rootNodePosition = distanceBetweenNodes 
    * Math.pow(maxSiblingCount, maxDepth);
    let canvasDimentionY = rootNodePosition  * 2 + 100; // 100px padding
    let canvasDimentionX = (distanceBetweenNodes + 50) * (maxDepth + 1) + 100;

    function updateState(){
        const ctx = theCanvas.current.getContext('2d');
        ctx.clearRect(0,0, canvasDimentionX, canvasDimentionY);
        
        console.log("CANVAS CLEARED");
        tree
        //.find(node => node.data.courseCode === nodeName)
        .traverseDown(iterator);
    }
    
    function iterator (node) {
        let numOfSiblings = (node.parent)? node.parent.children.length : 1;
        let positionInSibling = 0;
        if (node.parent){
            positionInSibling = node.parent.children.findIndex(n => n.data.courseCode === node.data.courseCode);
        }

        let nodePosition = 0;
        if (numOfSiblings % 2 === 0){
            let x = numOfSiblings / 2 - 0.5 - positionInSibling;
            if (x < 0){
                x = Math.floor(x);
            }else{
                x = Math.ceil(x);
            }
            nodePosition = x * -1;
        }else{
            nodePosition = (Math.floor(numOfSiblings / 2) - positionInSibling) * -1;
        }
        
        //node.data.yPos = (node.parent)? node.parent.data.yPos + nodePosition * distanceBetweenNodes * maxSiblingCount : distanceBetweenNodes * maxDepth * maxSiblingCount;
        
        node.data.yPos = (node.parent)? node.parent.data.yPos 
        + nodePosition * distanceBetweenNodes 
        * Math.pow(maxSiblingCount, maxDepth - node.depth) 
        : rootNodePosition;
        
        // var depth = "", i;
        // for (i = 1; i <= node.depth; i++) depth += "--";
        //console.log([depth, node.data.courseCode].join(" "));
        //value.push(<span>{[depth, node.data.courseCode].join(">")}</span>);
        //value.push(node.data.courseCode);
        // value.push(
        // <StyledCanvasNode 
        //     x={(maxDepth - node.depth) * (distanceBetweenNodes + 20)} 
        //     y={node.data.yPos} 
        //     radius={nodeRadius}
        // >
        //     {node.data.courseCode} -//- {nodePosition}
        // </StyledCanvasNode>
        // );
        const ctx = theCanvas.current.getContext('2d');
        if (node.parent){
            Node({
                ctx, 
                y: node.data.yPos + 50, 
                x: (maxDepth - node.depth) * (distanceBetweenNodes + 20) + 50, 
                radius: nodeRadius, 
                text: `${node.data.courseCode}`, 
                parentY: node.parent.data.yPos + 50, 
                parentX: (maxDepth - node.parent.depth) * (distanceBetweenNodes + 20) + 50
            });
        }else{
            Node({
                ctx, 
                y: node.data.yPos + 50, 
                x: (maxDepth - node.depth) * (distanceBetweenNodes + 20) + 50, 
                radius: nodeRadius, 
                text: `${node.data.courseCode}`
            });
        }
    }


    function iteratorLeafNodes (node) {
        if (node.children.length === 0){
            leafNodes.push(node.data.courseCode);
        }
    }


    // find all the leafNodes
    tree
    .traverseDown(iteratorLeafNodes);

    
    useEffect(() => {
        if (theContainer){
            theContainer.current.scrollTo(0,rootNodePosition);
        }
        updateState();
    },[props.selectedCourse, props.prereq[props.selectedCourse.code]]);
    
    //value = value.reverse()
    return (
        <div>
        <h2>Course Progression</h2>
        
        <StyledCanvasContainer
            ref={theContainer}
        >
            {/* {value} */}
            <canvas 
                // style={{ background: 'darkgrey', border: '2px solid black'}} 
                ref={theCanvas} 
                width={canvasDimentionX} 
                height={canvasDimentionY}
            ></canvas>
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
