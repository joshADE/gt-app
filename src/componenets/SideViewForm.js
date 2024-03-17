import React, { useState, useEffect } from 'react'
import { StyledButtonSave } from '../styles/components/programmapStyles';
import { StyledButtonShow, StyledSelect } from '../styles/components/sideviewStyles';
import PropTypes from 'prop-types';

function SideViewForm({
    sendNotification,
    selectedCourse,
    selectedTerm,
    handleClickEditPrereq,
    handleClickEditCoreq,
    prereq, 
    coreq, 
    courses,
    handleClickShowPrereq,
    handleClickShowCoreq
}) {
        
    const [state, setState] = useState({
        prereqCourses: [],
        coreqCourses:[]
    });

    
    // New onChange(for 'react-select' component)
    const onChange = (value, { name, action }) => {
        switch (action) {
          case 'remove-value':
            break;
          case 'pop-value':
            break;
          case 'clear':
            break;
            default:
        }
        
        setState({ 
            ...state,
            [name]: value 
        });
    }

    
    // Transforms a course into a format used by 'react-select'
    const getSelectOption = (course) => {
        return {value: course.code, label: course.code };
    }
    // Transforms from 'react-select' option format to course code
    const getValueFromSelectOption = (option) => {
        return option.value;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // Notify the user that their changes have been set
        sendNotification("Changes set");
        
        // New onSubmit code
        // must extract the value from the react-select components
        const code = selectedCourse.code;
        console.log("submitted");
        
        let pC = state.prereqCourses || [];


        console.log("prereq");
        const prs = pC.map(option => getValueFromSelectOption(option));
        console.log(prs);
        handleClickEditPrereq(code, prs);
        

        let cC = state.coreqCourses || [];

        console.log("coreq");
        const crs = cC.map(option => getValueFromSelectOption(option));
        
        console.log(crs);
        handleClickEditCoreq(code, crs);
        //forceUpdate();
    }

    

    useEffect(() => {
        updateState();
    }, [ prereq, coreq, courses, selectedCourse, selectedTerm]);
    
    

    const updateState = () => {

        if (!selectedCourse) return;

        let selectedPrereqList = prereq[selectedCourse.code];
        if (!selectedPrereqList){
            selectedPrereqList = [];
        }

        console.log("selectedPrereqList");
        console.log(selectedPrereqList);
        
        let selectPrereq = courses.slice(0, selectedTerm);
        let selectOptionsPrereq = [].concat.apply([], selectPrereq); // flatten the 2d array
        
        // get the full course details of the courses that are prereq
        selectOptionsPrereq = selectOptionsPrereq
        .filter(course => {
            return course.code !== selectedCourse.code && selectedPrereqList.includes(course.code);
        });
        


        let selectedCoreqIndex = coreq
        .findIndex(cl => (cl.findIndex(c => c === selectedCourse.code) >= 0));
        

        let selectedCoreqList;
        if (selectedCoreqIndex < 0){
            selectedCoreqList = [];
        }else{
            selectedCoreqList = coreq[selectedCoreqIndex];
        }

        console.log("selectedCoreqList");
        console.log(selectedCoreqList);

        
        // get the full course details of the courses that are coreq
        console.log(selectedTerm);
        let selectOptionsCoreq = courses[selectedTerm];
        if (selectOptionsCoreq == null){
            selectOptionsCoreq = [];
        }
        selectOptionsCoreq = selectOptionsCoreq
        .filter(course => {
            return course.code !== selectedCourse.code && selectedCoreqList.includes(course.code) ;
        });
        

        
        setState({
            ...state,
            prereqCourses: selectOptionsPrereq.map(c => getSelectOption(c)),
            coreqCourses: selectOptionsCoreq.map(c => getSelectOption(c)),
        });
        
            
        
    }

    
        // get the available options for the prereq courses
        let selectPrereq = courses.slice(0, selectedTerm);
        let selectOptionsPrereq = [].concat.apply([], selectPrereq); // flatten the 2d array
        
        selectOptionsPrereq = selectOptionsPrereq
        .map((course) =>{
            return getSelectOption(course);
        });
        
        


        // get the available options for the coreq courses
        let selectOptionsCoreq = courses[selectedTerm];
        
        if (selectOptionsCoreq == null){
            selectOptionsCoreq = [];
        }
        selectOptionsCoreq = selectOptionsCoreq
        .filter(course => {
            return course.code !== selectedCourse.code;
        })
        .map(course =>{
            return getSelectOption(course);
        });
        



    
    return (
        <form
            onSubmit={onSubmit}
            style={formStyle}
            className="sideViewForm"
        > 
            <div>
                <label>Prerequisites</label>
                <br/>
                <StyledButtonShow
                    style={buttonShowStyle}
                    type="button"
                    onClick={handleClickShowPrereq.bind(this, selectedCourse.code)}
                >Highlight Pre-requisites</StyledButtonShow>
                <StyledSelect 
                    
                    styles={customStyles}
                    onChange={onChange}
                    name="prereqCourses"
                    isMulti 
                    options={selectOptionsPrereq}
                    value={state.prereqCourses}
                />
            </div>

            <div>
                <label>Corequisites</label>
                <br/>
                <StyledButtonShow 
                    style={buttonShowStyle}
                    type="button"
                    onClick={handleClickShowCoreq.bind(this, selectedCourse.code)}
                >Highlight Co-requisites</StyledButtonShow>
                <StyledSelect 
                    
                    styles={customStyles}
                    onChange={onChange}
                    name="coreqCourses"
                    isMulti 
                    options={selectOptionsCoreq}
                    value={state.coreqCourses}
                />
            </div>
        
            <div style={{textAlign:'center', fontWeight:'bold'}}>
                Remember to click accept changes after making changes
            </div>


            <StyledButtonSave type="submit">Accept Changes</StyledButtonSave>

                    
        </form>
    )
}

const buttonShowStyle = {
    
}


const formStyle = {
    border: 'none',
    margin: '0 auto',
}

// Custom style for 'react-select', uses Emotion JS
const customStyles = {
    container: (provided) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        
      }),

      control: (provided) => ({
        ...provided,
        overflowY: 'scroll',
        height: 30,
      }),


}

SideViewForm.propTypes = {
    sendNotification: PropTypes.func,
    selectedCourse: PropTypes.object,
    selectedTerm: PropTypes.number,
    handleClickEditPrereq: PropTypes.func,
    handleClickEditCoreq: PropTypes.func,
    prereq: PropTypes.array,
    coreq: PropTypes.array,
    courses: PropTypes.array,
    handleClickShowPrereq: PropTypes.func,
    handleClickShowCoreq: PropTypes.func
}

export default SideViewForm
