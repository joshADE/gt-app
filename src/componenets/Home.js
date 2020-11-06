import React, { Component } from 'react'
import { connect } from 'react-redux';

import { 
  StyledInner,
  StyledInnerTop,
  StyledInnerBottom,
  StyledInnerBottomHead,
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
import * as CourseActionCreators from '../redux';
import SideViewHeader from './SideViewHeader';


class Home extends Component {

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
    //alert("saving " + JSON.stringify(this.state.courses) + " into localStorage.");
    localStorage.setItem(App.localStorageKey, JSON.stringify(this.props.courses));
    localStorage.setItem(App.localStorageKey+"prereq", JSON.stringify(this.props.prereq));
    localStorage.setItem(App.localStorageKey+"coreq", JSON.stringify(this.props.coreq));
    this.sendNotification('Changes saved');
  }



  // Finding the max number of courses out of all terms
  getMaxCourseForYears = () => {
      const max = Math.max(...this.props.courses.map((val, index) => val.length));
      return max;
  }

  sendNotification = (msg) => {
    notify(msg);
  }

  render(){
    return (
        <React.Fragment>
            <StyledInner>
              <StyledInnerTop>
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
            </StyledInnerTop>
            <StyledInnerBottom 
              expanded={(this.props.selectedCourse !== null)}
            >
              {/* Contains StyledInnerBottomHead */}
              <SideViewHeader> 

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
              </SideViewHeader>
              
              <StyledInnerBottomFoot>
                    
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
              </StyledInnerBottomFoot>
            </StyledInnerBottom>
          </StyledInner>
        </React.Fragment>
    )
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
  )(Home);