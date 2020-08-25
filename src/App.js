import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import { v3, v4, v5 } from 'uuid'
import './App.css';
import CourseClass from './componenets/model/CourseClass';
import ProgramMap from './componenets/ProgramMap';
import Header from './componenets/layout/Header';
import About from './componenets/pages/About';
import SaveChanges from './componenets/SaveChanges';
import GradeFilter from './componenets/GradeFilter';
import SideView from './componenets/SideView';
import ResetChanges from './componenets/ResetChanges';
import Notification, { notify } from './componenets/Notification';
import CGPACalculator from './componenets/CGPACalculator';

import * as CourseActionCreators from './redux';

const SAMPLE_COURSES = [
  [
    new CourseClass("OO Prog", "PROG10082", 3.3, 6),
    new CourseClass("Intro to Data.", "TELE13167", 2.6, 3),
    new CourseClass("Web Dev.", "SYST10049", 3.5, 3)
  ],
  [
    new CourseClass("OO Prog 2", "PROG24178", 3.0, 6),
    new CourseClass("Data Netw. Design", "TELE33324", 2.2, 3),
    new CourseClass("Web Prog.", "SYST10199", 2.6, 3)
  ],
  [
    new CourseClass("JAVA", "PROG32758", 3.3, 6),
    new CourseClass("Comp. Sec.", "INFO24178", 3.3, 3),
    new CourseClass("Databases", "DBAS27198", 3.3, 3)
  ]
]

const SAMPLE_PREREQ = {
  "PROG24178": ["PROG10082"],
  "PROG32758": ["PROG24178"],
  "TELE33324": ["TELE13167"],
  "SYST10199": ["SYST10049"],
}

const SAMPLE_COREQ = [
  ["PROG32758", "DBAS27198"],
]


class App extends Component {
  static apiurlpartial = '';
  static localStorageKey = 'courses';
  constructor(props){
    super(props);
    // Note that these variables for the state have been moved to the Redux store, and are no longer used
    this.state = { 
      //courses: [[]], // 2d array, 1st dim = terms, 2nd dim = courses
      filteredCourses: [], // array of courses to highlight
      prereq: {}, // will be treated as a map/dictionary, stores all prerequisites for each course, values are arrays
      coreq: [], // will be treated as an array of sets(but implmented as a 2d array)
      selectedCourse: null, // current selected course
      selectedTerm: null // current selected term
    };
    
  }

  componentDidMount(){
    this.populateCourseData();
  }

  resetChanges(){
    let confirmed = window.confirm("Are you sure you want to reset to the last saved changes?");
    if (!confirmed){
      return;
    }
    this.populateCourseData();
    this.props.clearFilter();
    this.props.clearSelected();

    // this.setState({
    //   filteredCourses: [],
    //   selectedCourse: null,
    //   selectedTerm: null
    // });
  }


  /* Local Storage Saving / Retrieving */
  populateCourseData(){
    const dataStringCourses = localStorage.getItem(App.localStorageKey);
    const dataStringPrereq = localStorage.getItem(App.localStorageKey+"prereq");
    const dataStringCoreq = localStorage.getItem(App.localStorageKey+"coreq");
    //alert("retrieved " + JSON.parse(dataString) + " from localStorage.");
    if (!dataStringCourses){
      return;
    }
    const dataObjectCourses = JSON.parse(dataStringCourses);
    const dataObjectPrereq = JSON.parse(dataStringPrereq);
    const dataObjectCoreq = JSON.parse(dataStringCoreq);


    this.props.loadCourses(
      dataObjectCourses, 
      (dataObjectPrereq)?dataObjectPrereq:this.props.prereq,
      (dataObjectCoreq)?dataObjectCoreq:this.props.coreq
    );
    // this.setState({
    //   courses: dataObjectCourses,
    //   prereq: (dataObjectPrereq)?dataObjectPrereq:this.state.prereq,
    //   coreq: (dataObjectCoreq)?dataObjectCoreq:this.state.coreq,
    // });

    
  }

  saveCourseData(){
    let confirmed = window.confirm("Are you sure you want to save all the changes?");
    if (!confirmed){
      return;
    }
    //alert("saving " + JSON.stringify(this.state.courses) + " into localStorage.");
    localStorage.setItem(App.localStorageKey, JSON.stringify(this.props.courses));
    localStorage.setItem(App.localStorageKey+"prereq", JSON.stringify(this.props.prereq));
    localStorage.setItem(App.localStorageKey+"coreq", JSON.stringify(this.props.coreq));
    this.sendNotification('Changes saved');
  }



  // Finding the max number of courses out of all terms
  getMaxCourseForYears(){
      const max = Math.max(...this.props.courses.map((val, index) => val.length));
      return max;
  }

  sendNotification = (msg) => {
    notify(msg);
  }


  render(){
      return(
        <Router>
          <div className="App">
            <div className="container">
              <Header />
              <Notification />
              <Route exact path="/"
              render={props => (
                <React.Fragment>
                  <div className="inner">
                    <div className="inner-top">
                    
                      <ProgramMap 
                        handleClickAddTerm={this.props.addTerm}
                        handleClickRemoveTerm={this.props.removeTerm}
                        handleClickAddCourse={this.props.addCourse}
                        handleClickEditCourse={this.props.editCourse}
                        handleClickSelectCourse={this.props.toggleSelect}
                        handleClickDeleteCourse={this.props.deleteCourse}
                        maxCourseYears={this.getMaxCourseForYears()}
                        courses={this.props.courses}
                        selectedCourse={this.props.selectedCourse}
                        filteredCourses={this.props.filteredCourses}
                      />
        
                    </div>
                    <div className={(this.props.selectedCourse==null)?"inner-bottom":"inner-bottom expanded"}>
                      <div className="inner-bottom-head">
                        <SaveChanges
                          onSaveClick={() => this.saveCourseData()}
                        />
                        <ResetChanges 
                          onResetClick={() => this.resetChanges()}
                        />
                        <GradeFilter
                          onClickFilterByCategory={this.props.filterByCategory}
                        />
                        <CGPACalculator 
                          courses={this.props.courses}
                        /> 
                      </div>
                      <div className="inner-bottom-foot">
                         
                        <SideView 
                          sendNotification={this.sendNotification}
                          handleClickEditCourse={this.props.editCourse}
                          courses={this.props.courses}
                          selectedTerm={this.props.selectedTerm}
                          selectedCourse={this.props.selectedCourse}
                          prereq={this.props.prereq}
                          coreq={this.props.coreq}
                          handleClickEditPrereq={this.props.editPrereq}
                          handleClickEditCoreq={this.props.editCoreq}
                          handleClickShowPrereq={this.props.showPrereq}
                          handleClickShowCoreq={this.props.showCoreq}
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )} />
              <Route path="/about" component={About} />
            </div>
          </div>
        </Router>
      );
  }
}


const mapStateToProps = state => {
  return {
    courses: state.courses.courses,
    filteredCourses: state.courses.filteredCourses,
    selectedCourse: state.courses.selectedCourse,
    selectedTerm: state.courses.selectedTerm,
    prereq: state.courses.prereq,
    coreq: state.courses.coreq
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCourse: (term, courseCode) => dispatch(CourseActionCreators.addCourse(term, courseCode)),
    editCourse: (term, editedCourse) => dispatch(CourseActionCreators.editCourse(term, editedCourse)),
    deleteCourse: (term, courseCode) => dispatch(CourseActionCreators.deleteCourse(term, courseCode)),
    addTerm: () => dispatch(CourseActionCreators.addTerm()),
    removeTerm: () => dispatch(CourseActionCreators.removeTerm()),
    toggleSelect: (courseCode) => dispatch(CourseActionCreators.toggleSelectCourse(courseCode)),
    clearSelected: () => dispatch(CourseActionCreators.clearSelected()),
    filterByCategory: (category, value) => dispatch(CourseActionCreators.filterByCategory(category, value)),
    clearFilter: () => dispatch(CourseActionCreators.clearFilter()),
    editPrereq: (courseCode, prereqCourses) => dispatch(CourseActionCreators.editPrereq(courseCode, prereqCourses)),
    editCoreq: (courseCode, coreqCourses) => dispatch(CourseActionCreators.editCoreq(courseCode, coreqCourses)),
    showPrereq: (courseCode) => dispatch(CourseActionCreators.showPrereq(courseCode)),
    showCoreq: (courseCode) => dispatch(CourseActionCreators.showCoreq(courseCode)),
    loadCourses: (courses, prereq, coreq) => dispatch(CourseActionCreators.loadCourses(courses, prereq, coreq))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
