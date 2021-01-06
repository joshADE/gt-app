import React, { Component, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { StyledButtonShow, StyledSelect, StyledContainer, StyleResponsiveContainer } from '../styles/components/sideviewStyles';
import { StyledButtonSave } from '../styles/components/programmapStyles';
import Progression from './Progression';
import { NonceProvider } from 'react-select';


function SideView ({
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
    const onChange = (value, { name, action, removedValue }) => {
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

        // Somehow the Progression child Component only recieves 
        // props and then rerenders when 
        // state changes locally in this component
        setState({...state});
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



        const shouldShow = (selectedCourse !== null);
        
        if (!shouldShow){
            return (
                <StyledContainer>
                    <h2>Advanced Course Edit</h2>
                    <p>You must select a course first</p>
                    
                </StyledContainer>
            );
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
        


       
        const form = 
                <form
                onSubmit={onSubmit}
                sytle={formStyle}
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
                ;




        return (
            <StyledContainer>
                
                <h2>Advanced Course Edit</h2>
                <h3>For course: {selectedCourse.code}</h3>
                    
                <StyleResponsiveContainer>
                    {form}
                    <Progression
                            prereq={prereq}
                            selectedCourse={selectedCourse}
                    />  
                </StyleResponsiveContainer>
            </StyledContainer>
        );
        
    
}   


// PropTypes
SideView.propType = {
    sendNotification: PropTypes.func.isRequired,
    handleClickEditCourse: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    selectedTerm: PropTypes.number.isRequired,
    selectedCourse: PropTypes.object.isRequired,
    prereq: PropTypes.array.isRequired,
    coreq: PropTypes.array.isRequired,
    handleClickEditPrereq: PropTypes.func.isRequired,
    handleClickEditCoreq: PropTypes.func.isRequired,
}

// const sideViewStyle = {
//     background: 'lightgrey',
//     width: '100%',
//     textAlign: 'center',
//     border: '2px solid grey',    
//     overflowY: 'scroll',
//     height: '100%', 
// }

const buttonShowStyle = {
    
}


const formStyle = {
    border: 'none',
    margin: '0 auto',
}

// Custom style for 'react-select', uses Emotion JS
const customStyles = {
    container: (provided, state) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        
      }),

      control: (provided, state) => ({
        ...provided,
        overflowY: 'scroll',
        height: 30,
        boxShadow: state.isFocused? '0 0 0 1px #3CB371': 'none',
        //borderColor: state.isFocused || state.isSelected || state.isActive ? '#3CB371': 'transparent',
        //boxShadow: state.isFocused || state.isSelected || state.isActive ? '0 0 0 .2rem rgba(60,179,113, 0.2)': 'none',
        //outline: state.isFocused || state.isSelected ||  state.isActive ? '1px solid rgba(60,179,113, 0.2)': 'none',
    }),
      input: (provided, state) => ({
          ...provided,
      })


}


export default SideView
