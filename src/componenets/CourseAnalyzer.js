import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import { StyledInnerBottomHeadItem, StyledButton, StyledInput } from '../styles/components/homeStyles';

const types = [
    "Course with worst grade and highest credit",
    "Course with best grade and highest credit",
    "Course with worst grade and lowest credit",
    "Course with best grade and lowest credit",
    "Corequisite/Prerequisite Analysis"
]

function CourseAnalyzer({
    courses,
    prereq,
    coreq
}) {
    const [recommendedCourse, setRecommendedCourse] = useState('');
    const [type, setType] = useState(0);
    const [term, setTerm] = useState(courses.length);
    

    const typeOptions = types.map((t, index) => 
    (<option key={index} value={index}>{t}</option>));

    const termOptions = courses.map((cList, index) => 
    (<option key={index + 1} value={index + 1}>{index + 1}</option>));



    const onSubmit = (e) => {
        
        e.preventDefault();
        let allCourses = [].concat.apply([], courses); // flatten the 2d array

        let highestGrade = Math.max(...allCourses.map(c => c.grade));
        highestGrade *= highestGrade;
        switch(type.toString()){
            case '0':
                allCourses.sort((courseA, courseB) => courseA.credits * (highestGrade - courseA.grade) - courseB.credits * (highestGrade - courseB.grade));
                break;
            case '1':
                allCourses.sort((courseA, courseB) => courseA.credits * courseA.grade - courseB.credits * courseB.grade);
                break;
            case '2':
                allCourses.sort((courseA, courseB) => courseB.credits * courseB.grade - courseA.credits * courseA.grade);
                break;
            case '3':
                allCourses.sort((courseA, courseB) => courseB.credits * (highestGrade - courseB.grade) - courseA.credits * (highestGrade - courseA.grade));
                break;
            default:
                allCourses = [{code: 'Not Implemented'}];
                break;
        }
        console.log(allCourses);
        if (allCourses.length > 0){
            setRecommendedCourse(allCourses[allCourses.length - 1].code);
        }
    }
    return (
       
        <StyledInnerBottomHeadItem
        onSubmit={onSubmit}
        >
            <Label> Type:</Label>
            <StyledInput 
                type="select" 
                id="typeSelect" 
                name="type"
                onChange={e => setType(e.target.value)}
                defaultValue={type}
            >
                {typeOptions}
            </StyledInput>
            
            {/* For some reason type evaluates to a string */}
            {type === '4' &&
            <>
            <Label> Term:</Label>
            <StyledInput 
                type="select" 
                id="termSelect"
                name="term"
                onChange={e => setTerm(e.target.value)}
                defaultValue={term}
            >
                {termOptions}
            </StyledInput>
            </>}

            
            <StyledButton type="submit" value="Find course"/>
            
            <Label style={{width: 'auto' }}>Course: {recommendedCourse}</Label>
        </StyledInnerBottomHeadItem>
    )
}



export default CourseAnalyzer
