import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select'

export class SideView extends Component {

    constructor(props){
        super(props);
        this.state = {
            prereqCourses:[],
            coreqCourses:[],

        };
    }
    
    // New onChange(for 'react-select' component)
    onChange = (value, { name, action, removedValue }) => {
        switch (action) {
          case 'remove-value':
          case 'pop-value':
            break;
          case 'clear':
            break;
            default:
        }
        
        this.setState({ 
            [name]: value 
        });
    }

    // Transforms a course into a format used by 'react-select'
    getSelectOption = (course) => {
        return {value: course.code, label: course.code };
    }
    // Transforms from 'react-select' option format to course code
    getValueFromSelectOption = (option) => {
        return option.value;
    }

    onSubmit = (e) => {
        e.preventDefault();

        // New onSubmit code
        // must extract the value from the react-select components
        const code = this.props.selectedCourse.code;
        console.log("submitted");
        if (!this.state.prereqCourses == null){
            this.setState({
                prereqCourses:  [],
            })
        }
        console.log("prereq");
        const prs = this.state.prereqCourses.map(option => this.getValueFromSelectOption(option));
        console.log(prs);
        this.props.handleClickEditPrereq(code, prs);
        

        if(this.state.coreqCourses == null){
            this.setState({
                coreqCourses:  [],
            })
        }
        const crs = this.state.coreqCourses.map(option => this.getValueFromSelectOption(option));
        console.log("coreq");
        console.log(crs);
        this.props.handleClickEditCoreq(code, crs);
        
    }

    

    
    // this doesn't get called after a user deletes a course
    // only componentWillUpdate gets called
    componentWillReceiveProps(newProps){
        console.log("Inside componentWillReceiveProps");
        console.log(this.props);
        console.log(newProps);
        
        
        // Only update the state (and then the UI) if the component
        // receives a new set of props
        console.log("Are the oldProp and newProp equal?");
        if (!this.equal(this.props, newProps)){
            this.updateState(newProps);
        }
    }
    


    equal(first, second){
        const result = JSON.stringify(first) === JSON.stringify(second);
        console.log("result: " + result);
        return result;
    }

    

    updateState(newProps){

        const {selectedCourse, prereq, coreq, courses, selectedTerm} = newProps;

        
        if (!selectedCourse) return;

        let selectedPrereqList = prereq[selectedCourse.code];
        if (!selectedPrereqList){
            selectedPrereqList = [];
        }

        console.log("selectedPrereqList");
        console.log(selectedPrereqList);
        
        let selectPrereq = courses.slice(0, selectedTerm);
        let selectOptionsPrereq = [].concat.apply([], selectPrereq); // flatted the 2d array
        
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
        

        
        this.setState({
            prereqCourses: selectOptionsPrereq.map(c => this.getSelectOption(c)),
            coreqCourses: selectOptionsCoreq.map(c => this.getSelectOption(c)),
        });
        
            
        
    }



    render() {
        const shouldShow = (this.props.selectedCourse !== null);
        
        if (!shouldShow){
            return (
                <div style={sideViewStyle}>
                    <h2>Advanced Course Edit</h2>
                    <p>You must select a course first</p>
                </div>
            );
        }
        
        
        const {courses, selectedTerm, selectedCourse, prereq, coreq} = this.props;

        // Prerequisites
        let selectedPrereqList = prereq[selectedCourse.code];
        if (!selectedPrereqList){
            selectedPrereqList = [];
        }

        let selectPrereq = courses.slice(0, selectedTerm);
        let selectOptionsPrereq = [].concat.apply([], selectPrereq); // flatted the 2d array
        if (shouldShow){
            selectOptionsPrereq = selectOptionsPrereq
            .filter(course => {
                return course.code !== selectedCourse.code;
            })
            .map((course) =>{
                return this.getSelectOption(course);
            });
        }
        
        // Corequisites
        let selectedCoreqIndex = coreq
        .findIndex(cl => cl.includes(selectedCourse.code));
        let selectedCoreqList;
        if (selectedCoreqIndex < 0){
            selectedCoreqList = [];
        }else{
            selectedCoreqList = coreq[selectedCoreqIndex];
           
        }



        let selectOptionsCoreq = courses[selectedTerm];
        if (shouldShow){
            if (selectOptionsCoreq == null){
                selectOptionsCoreq = [];
            }
            selectOptionsCoreq = selectOptionsCoreq
            .filter(course => {
                return course.code !== selectedCourse.code;
            })
            .map(course =>{
                return this.getSelectOption(course);
            });
        }


       
        const form = 
                <form
                onSubmit={this.onSubmit}
                sytle={formStyle}
                >
                    <h3>For course: {(shouldShow)?this.props.selectedCourse.code:""}</h3>
                    <br />
                    
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th>
                                    <label>Pre-Requisites</label>
                                </th>
                                <th></th>
                                <th>
                                    <label>Co-Requisites</label>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        className="btnShow"
                                        style={buttonShowStyle}
                                        type="button" 
                                        value="Highlight Pre-requisites" 
                                        onClick={this.props.handleClickShowPrereq.bind(this, selectedCourse.code)}

                                    />
                                </td>
                                <td>

                                </td>
                                <td>
                                    <input 
                                        className="btnShow"
                                        style={buttonShowStyle}
                                        type="button" 
                                        value="Highlight Co-requisites"
                                        onClick={this.props.handleClickShowCoreq.bind(this, selectedCourse.code)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center', fontWeight:'bold'}} colSpan={3}>
                                    Remember to click accept changes after making changes
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Select 
                                        
                                        styles={customStyles}
                                        onChange={this.onChange}
                                        name="prereqCourses"
                                        isMulti 
                                        options={selectOptionsPrereq}
                                        value={this.state.prereqCourses}
                                    />
                                </td>
                                <td></td>
                                <td>
                                    <Select 
                                        
                                        styles={customStyles}
                                        onChange={this.onChange}
                                        name="coreqCourses"
                                        isMulti 
                                        options={selectOptionsCoreq}
                                        value={this.state.coreqCourses}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    
                    <input className="btn" type="submit" value="Accept Changes"/>
                </form>
                ;




        return (
            <div style={sideViewStyle}>
                
                <h2>Advanced Course Edit</h2>
                
                {
                    form
                }
            </div>
        );
        
    }
}   


// PropTypes
SideView.propType = {
    handleClickEditCourse: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    selectedTerm: PropTypes.number.isRequired,
    selectedCourse: PropTypes.object.isRequired,
    prereq: PropTypes.array.isRequired,
    coreq: PropTypes.array.isRequired,
    handleClickEditPrereq: PropTypes.func.isRequired,
    handleClickEditCoreq: PropTypes.func.isRequired,
}

const sideViewStyle = {
    background: 'lightgrey',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    border: '2px solid grey'
                 
}

const buttonShowStyle = {
    
}

const tableStyle = {
    border: 'none'

}

const formStyle = {
    border: 'none',
}

const customStyles = {
    container: (provided, state) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        width: 250,
      }),

      control: (provided, state) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        overflowY: 'scroll',
        height: 30,
      }),


}

/*
const sideViewStyleDisable = {
    textAlign:'center',
    ...sideViewStyle
} 
*/  

export default SideView
