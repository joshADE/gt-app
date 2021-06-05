import React, { Component } from 'react'
import { connect } from 'react-redux';

import { 
  StyledInner,
  StyledInnerTop,
  StyledInnerBottom,
  StyledInnerBottomWrapper,
  StyledInnerBottomFoot
} from '../styles/components/homeStyles';


import SaveChanges from './SaveChanges';
import GradeFilter from './GradeFilter';
import SideView from './SideView';
import ResetChanges from './ResetChanges';
import CGPACalculator from './CGPACalculator';
import ProgramMap from './ProgramMap';
import { notify } from './Notification';
import App from '../App';
// import * as CourseActionCreators from '../redux';
import { 
  addCourse, editCourse, deleteCourse, addTerm, removeTerm, 
  toggleSelectCourse, clearSelected, filterByCategory, clearFilter,
  editPrereq, editCoreq, showPrereq, showCoreq, loadCourses   
} from '../redux/index';
import SideViewHeader from './SideViewHeader';
import CourseAnalyzer from './CourseAnalyzer';


class Home extends Component {

  componentWillUnmount = () => {
    // this is a temporary fix for the problems that I'm getting with
    // the focusElement and react-select not updating properly when you 
    // exit the Home component 
    this.props.clearSelected();
  }
  resetChanges = () => {
    let confirmed = window.confirm("Are you sure you want to reset to the last saved changes?");
    if (!confirmed){
      return;
    }
    this.props.populateCourseData();
    this.props.clearFilter();
    this.props.clearSelected();

  }


  /* Local Storage Saving / Retrieving */
  saveCourseData = () =>{
    let confirmed = window.confirm("Are you sure you want to save all the changes?");
    if (!confirmed){
      return;
    }
    const { courses, prereq, coreq } = this.props.courses;
    localStorage.setItem(App.localStorageKey, JSON.stringify(courses));
    localStorage.setItem(App.localStorageKey + "prereq", JSON.stringify(prereq));
    localStorage.setItem(App.localStorageKey + "coreq", JSON.stringify(coreq));
    this.sendNotification('Changes saved');
  }



  // Finding the max number of courses out of all terms
  getMaxCourseForTerms = () => {
      return Math.max(...this.props.courses.courses.map((val) => val.length));
  }

  sendNotification = (msg) => {
    notify(msg);
  }

  render(){

    const { addTerm, removeTerm, addCourse, editCourse, toggleSelectCourse, 
      deleteCourse, filterByCategory, editPrereq, editCoreq, showPrereq, showCoreq } = this.props;

    const { courses, selectedCourse, filteredCourses, prereq, coreq,
       selectedTerm } = this.props.courses;

    return (
        <React.Fragment>
            <StyledInner>
              <StyledInnerTop>
                <ProgramMap 
                handleClickAddTerm={addTerm}
                handleClickRemoveTerm={removeTerm}
                handleClickAddCourse={addCourse}
                handleClickEditCourse={editCourse}
                handleClickSelectCourse={toggleSelectCourse}
                handleClickDeleteCourse={deleteCourse}
                maxCourseYears={this.getMaxCourseForTerms()}
                courses={courses}
                selectedCourse={selectedCourse}
                filteredCourses={filteredCourses}
                />
            </StyledInnerTop>
            <StyledInnerBottom 
              expanded={(selectedCourse !== null)}
            >
            <StyledInnerBottomWrapper>
              {/* Contains StyledInnerBottomHead */}
              <SideViewHeader> 

                <SaveChanges
                    onSaveClick={this.saveCourseData}
                />
                <ResetChanges 
                    onResetClick={this.resetChanges}
                />
                <CGPACalculator 
                    courses={courses}
                /> 
                <GradeFilter
                    onClickFilterByCategory={filterByCategory}
                />
                <CourseAnalyzer 
                  courses={courses}
                  prereq={prereq}
                  coreq={coreq}
                />
                
              </SideViewHeader>
              
              <StyledInnerBottomFoot>
                    
                <SideView 
                    sendNotification={this.sendNotification}
                    courses={courses}
                    selectedTerm={selectedTerm}
                    selectedCourse={selectedCourse}
                    prereq={prereq}
                    coreq={coreq}
                    handleClickEditPrereq={editPrereq}
                    handleClickEditCoreq={editCoreq}
                    handleClickShowPrereq={showPrereq}
                    handleClickShowCoreq={showCoreq}
                />
              </StyledInnerBottomFoot>
              </StyledInnerBottomWrapper>
            </StyledInnerBottom>
          </StyledInner>
        </React.Fragment>
    )
  }
}



// const mapStateToProps = state => {
//     return {
//       courses: state.courses.courses,
//       filteredCourses: state.courses.filteredCourses,
//       selectedCourse: state.courses.selectedCourse,
//       selectedTerm: state.courses.selectedTerm,
//       prereq: state.courses.prereq,
//       coreq: state.courses.coreq
//     }
//   }
  
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     addCourse: (term, courseCode) => dispatch(CourseActionCreators.addCourse(term, courseCode)),
  //     editCourse: (term, editedCourse) => dispatch(CourseActionCreators.editCourse(term, editedCourse)),
  //     deleteCourse: (term, courseCode) => dispatch(CourseActionCreators.deleteCourse(term, courseCode)),
  //     addTerm: () => dispatch(CourseActionCreators.addTerm()),
  //     removeTerm: () => dispatch(CourseActionCreators.removeTerm()),
  //     toggleSelect: (courseCode) => dispatch(CourseActionCreators.toggleSelectCourse(courseCode)),
  //     clearSelected: () => dispatch(CourseActionCreators.clearSelected()),
  //     filterByCategory: (category, value) => dispatch(CourseActionCreators.filterByCategory(category, value)),
  //     clearFilter: () => dispatch(CourseActionCreators.clearFilter()),
  //     editPrereq: (courseCode, prereqCourses) => dispatch(CourseActionCreators.editPrereq(courseCode, prereqCourses)),
  //     editCoreq: (courseCode, coreqCourses) => dispatch(CourseActionCreators.editCoreq(courseCode, coreqCourses)),
  //     showPrereq: (courseCode) => dispatch(CourseActionCreators.showPrereq(courseCode)),
  //     showCoreq: (courseCode) => dispatch(CourseActionCreators.showCoreq(courseCode)),
  //     loadCourses: (courses, prereq, coreq) => dispatch(CourseActionCreators.loadCourses(courses, prereq, coreq))
  //   }
  // }
  
  const mapState = state => state;

  const actionCreators = {
    addCourse, editCourse, deleteCourse, addTerm, removeTerm, 
    toggleSelectCourse, clearSelected, filterByCategory, clearFilter,
    editPrereq, editCoreq, showPrereq, showCoreq, loadCourses  
  };
  
  export default connect(
    mapState,
    actionCreators
  )(Home);