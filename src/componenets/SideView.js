import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class SideView extends Component {

    constructor(props){
        super(props);

        
        this.state = {
            prereqCourses:[],
            coreqCourses:[],

        };

      

    }


    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    getSelectedOptions(sel) {
        var opts = [],
            opt;
        var len = sel.options.length;
        for (var i = 0; i < len; i++) {
          opt = sel.options[i];
      
          if (opt.selected) {
            opts.push(opt.value);
            //alert(opt.value);
          }
        }
      
        return opts;
      }

    onChangeList = (e) => {
        this.setState({
            [e.target.name]: this.getSelectedOptions(e.target) 
        });
    
    }

    onSubmit = (e) => {
        e.preventDefault();
        const prs = this.state.prereqCourses;
        const crs = this.state.coreqCourses;
        const code = this.props.selectedCourse.code;
        
        this.props.handleClickEditPrereq(code, prs);
        
        this.props.handleClickEditCoreq(code, crs);
    }

    equal(first, second){
        const result = JSON.stringify(first) === JSON.stringify(second);
        console.log("result: " + result);
        return result;
    }

    updateState(newProps){
        
        const {selectedCourse, prereq, coreq} = newProps;

        if (selectedCourse === null) return;

        let selectedPrereqList = prereq[selectedCourse.code];
        if (!selectedPrereqList){
            selectedPrereqList = [];
        }

        //console.log(selectedPrereqList);
        
        let selectedCoreqIndex = coreq
        .findIndex(cl => (cl.findIndex(c => c === selectedCourse.code) >= 0));
        

        let selectedCoreqList;
        if (selectedCoreqIndex < 0){
            selectedCoreqList = [];
        }else{
            selectedCoreqList = coreq[selectedCoreqIndex];
        }


        if (!this.equal(this.props, newProps)){
            this.setState({
                prereqCourses: selectedPrereqList,
                coreqCourses: selectedCoreqList,
            });
        }
            
        
    }

    componentWillReceiveProps(newProps){
        //console.log(newProps);
        //console.log(this.props);
       this.updateState(newProps);
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

        
        let selectedPrereqList = prereq[selectedCourse.code];
        if (!selectedPrereqList){
            selectedPrereqList = [];
        }

        //console.log(selectedPrereqList);
        
        let selectedCoreqIndex = coreq
        .findIndex(cl => cl.includes(selectedCourse.code));
        

        let selectedCoreqList;
        if (selectedCoreqIndex < 0){
            selectedCoreqList = [];
        }else{
            selectedCoreqList = coreq[selectedCoreqIndex];
        }
        //console.log(selectedCoreqList);


        
        let selectOptionsPrereq = courses.slice(0, selectedTerm);
        selectOptionsPrereq = [].concat.apply([], selectOptionsPrereq);
        if (shouldShow){
            selectOptionsPrereq = selectOptionsPrereq
            .filter(course => {
                return course.code !== selectedCourse.code;
            })
            .map((course) =>{
                return <option 
                key={course.code} 
                value={course.code}
                >
                    {course.code}
                </option>
            });
        }
        let selectOptionsCoreq = courses[selectedTerm];
        if (shouldShow){
            selectOptionsCoreq = selectOptionsCoreq
            .filter(course => {
                return course.code !== selectedCourse.code;
            })
            .map(course =>{
                return <option  
                key={course.code} 
                value={course.code}
                >
                    {course.code}
                </option>
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
                                        type="button" 
                                        value="Highlight Pre-requisites" 
                                        onClick={this.props.handleClickShowPrereq.bind(this, selectedCourse.code)}

                                    />
                                </td>
                                <td>

                                </td>
                                <td>
                                    <input 
                                        
                                        type="button" 
                                        value="Highlight Co-requisites"
                                        onClick={this.props.handleClickShowCoreq.bind(this, selectedCourse.code)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center', fontWeight:'bold'}} colSpan={3}>
                                    Remember to hold control while making changes
                                </td>
                            </tr>
                            <tr>
                                <td>

                                    <select 
                                    size={4}        
                                    id="prereq-courses"
                                    name="prereqCourses"
                                    onChange={this.onChangeList}
                                    onLoad={this.onChangeList}
                                    multiple={true}
                                    value={this.state.prereqCourses}
                                    //value={selectedPrereqList}
                                    //defaultValue={new Array(...selectedPrereqList)}
                                    >
                                    {selectOptionsPrereq}}
                                    </select>
                                </td>
                                <td></td>
                                <td>
                                    <select 
                                    size={4}        
                                    id="coreq-courses"
                                    name="coreqCourses"
                                    onChange={this.onChangeList}
                                    onLoad={this.onChangeList}
                                    multiple={true}
                                    value={this.state.coreqCourses}
                                    //value={selectedCoreqList}
                                    //defaultValue={new Array(...selectedCoreqList)}
                                    >
                                    {selectOptionsCoreq}
                                    </select>
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

const tableStyle = {
    border: 'none'

}

const formStyle = {
    border: 'none',
}

/*
const sideViewStyleDisable = {
    textAlign:'center',
    ...sideViewStyle
} 
*/  

export default SideView
