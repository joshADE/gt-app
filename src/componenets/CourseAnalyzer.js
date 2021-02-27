import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

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
        switch(type){
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
       
        <form style={gradeFinderStyle}
        onSubmit={onSubmit}
        >
            <Label> Type:</Label>
            <Input 
                type="select" 
                id="typeSelect"
                style={inputStyle} 
                name="type"
                onChange={e => setType(e.target.value)}
                defaultValue={type}
            >
                {typeOptions}
            </Input>
            
            {/* For some reason type evaluates to a string */}
            {type === '4' &&
            <>
            <Label> Term:</Label>
            <Input 
                type="select" 
                id="termSelect"
                style={inputStyle} 
                name="term"
                onChange={e => setTerm(e.target.value)}
                defaultValue={term}
            >
                {termOptions}
            </Input>
            </>}

            
            <input type="submit" style={btnStyle} value="Find course"/>
            
            <Label style={{width: 'auto' }}>Course: {recommendedCourse}</Label>
        </form>
    )
}


const gradeFinderStyle = {
    padding: '0px 15px',
    borderRadius:'5px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    background: '#727272',
    // border: '2px outset black',
    color: 'white',
    height: '100%',
    fontWeight: 700,
};

const btnStyle = {
    display: 'inline-block',
    border: '1px solid #9C9C9C',
    background: '#64AA8E',
    borderRadius: '15px',
    color: '#fff',
    padding: '2px 10px',
    cursor: 'pointer',
    height: 'auto',
    margin: '1px 10px',
};

const inputStyle = {
    background: 'lightgrey',
    borderRadius: '5px',
    height: 'auto',
    width: 'auto',
    margin: '1px 10px',
}

export default CourseAnalyzer
