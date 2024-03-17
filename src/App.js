import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

// import * as AllActionsCreators from './redux/index';
import { toggleDarkmode, loadSettings, loadCourses, loadCustomSchool, toggleSelectCourse, changeStyle } from './redux/index';
import './App.css';
import { StyledAppContainer } from './styles/components/appStyles';
import GlobalStyles from '../src/styles/base/base';
import { defaultTheme, darkmodeTheme } from './styles/themes/themes';
import Header from './componenets/layout/Header';
import About from './componenets/pages/About';
import Notification from './componenets/Notification';
import Instructions from './componenets/pages/Instructions';
import Home from './componenets/Home';
import Settings from './componenets/Settings';
import { customSchoolName } from './redux/settings/settingsReducer';
import PropTypes from 'prop-types';


class App extends Component {

  static propTypes = {
    settings: PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,
    toggleDarkmode: PropTypes.func.isRequired,
    loadSettings: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadCustomSchool: PropTypes.func.isRequired,
    toggleSelectCourse: PropTypes.func.isRequired,
    changeStyle: PropTypes.func.isRequired,
}

  static localStorageKey = 'courses';

  componentDidMount = () => {
    this.restoreSettings();
    this.populateCourseData();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    // timeout is a fix to readjust the focus element
    setTimeout(() => {
      this.props.changeStyle();
    }, 500);
  }

  restoreSettings = () => {

    const { darkmode, stickyHeader, schools, currentSchool } = this.props.settings; // settings from props is the settings reducer state

    let currentSchoolFromLS = localStorage.getItem(App.localStorageKey + "currentSchool"); // currentSchool should be a string indicating the name of the current school in the setting page
    currentSchoolFromLS = currentSchoolFromLS ? JSON.parse(currentSchoolFromLS) : currentSchool; // I know I don't have to parse a string from the localStorage but this is just convention
    
    if (!schools[currentSchoolFromLS]){ // if there is no school grading data for the current school set it to the custom school name
      currentSchoolFromLS = customSchoolName; // the school grading data file might be missing and entry for the current school retrieved from the localStorage but the school grading data for the custom school has been set programmatically so it wouldn't be missing
    }

    let stickyHeaderFromLS = localStorage.getItem(App.localStorageKey + "stickyHeader"); // stickyHeader should be a boolean indicating whether the row headings are sticky
    stickyHeaderFromLS = stickyHeaderFromLS ? JSON.parse(stickyHeaderFromLS) : stickyHeader;

    let darkmodeFromLS = localStorage.getItem(App.localStorageKey + "darkmode"); // darkmode should be a boolean indicating whether there is darkmode
    darkmodeFromLS = darkmodeFromLS ? JSON.parse(darkmodeFromLS) : darkmode;

    this.props.loadSettings({
      darkmode: darkmodeFromLS,
      stickyHeader: stickyHeaderFromLS,
      currentSchool: currentSchoolFromLS,
    });

    // load the custom school's grading data from localStorage (should be the same type as the schools in the school data file)
    let customSchoolData = localStorage.getItem(App.localStorageKey + customSchoolName);
    customSchoolData = customSchoolData ? JSON.parse(customSchoolData): schools[customSchoolName];

    this.props.loadCustomSchool(customSchoolData);
  }

  // this will not only be called the first time when the user loads the app, but also when they click the reset changes button
  populateCourseData = () =>{

    const { prereq, coreq } = this.props.courses; // courses from props is the course reducer state


    const dataStringCourses = localStorage.getItem(App.localStorageKey);
    const dataStringPrereq = localStorage.getItem(App.localStorageKey + "prereq");
    const dataStringCoreq = localStorage.getItem(App.localStorageKey + "coreq");


    if (!dataStringCourses){
      // this.props.loadCourses([[]], {}, []);
      return;
    }
    const dataObjectCourses = JSON.parse(dataStringCourses); // should be a 2d array, 1st dimension represent the terms, 2nd dimension represents the courses in a term
    const dataObjectPrereq = JSON.parse(dataStringPrereq); // should be an object, keys are the course codes, values are an array of course codes representing prereq courses
    const dataObjectCoreq = JSON.parse(dataStringCoreq); // should be an array of arrays, each sub array represents a grouping of coreq course codes


    this.props.loadCourses(
      dataObjectCourses,
      dataObjectPrereq ? dataObjectPrereq : prereq,
      dataObjectCoreq ? dataObjectCoreq : coreq
    );

  }


  render(){

      return(
        <ThemeProvider theme={this.props.settings.darkmode?darkmodeTheme:defaultTheme}>
          <GlobalStyles />
          <Router>
            <div className="App">
              <StyledAppContainer>
                <Header />
                <Notification />
                <Route exact path="/" render={() => (
                  <Home 
                  populateCourseData={this.populateCourseData}
                  />
                )}/>
                <Route path="/about" component={About} />
                <Route path="/instructions" component={Instructions} />
                <Route path="/settings" component={Settings} />
              </StyledAppContainer>
            </div>
          </Router>
        </ThemeProvider>
      );
  }
}



// const mapStateToProps = state => {
//   return {
//     darkmode: state.settings.darkmode,
//     stickyHeader: state.settings.stickyHeader,
//     schools: state.settings.schools,
//     currentSchool: state.settings.currentSchool,
//     prereq: state.courses.prereq,
//     coreq: state.courses.coreq,
//     courses: state.courses.courses
//   }
// }


// const mapDispatchToProps = dispatch => {
//   return {
//     toggleDarkmode: () => dispatch(AllActionsCreators.toggleDarkmode()),
//     loadSettings: (items) => dispatch(AllActionsCreators.loadSettings(items)),
//     loadCourses: (courses, prereq, coreq) => dispatch(AllActionsCreators.loadCourses(courses, prereq, coreq)),
//     loadCustomSchool: (customSchoolSettings) => dispatch(AllActionsCreators.loadCustomSchool(customSchoolSettings)),
//     toggleSelected: () => dispatch(AllActionsCreators.toggleSelectCourse()),
//     changeStyle: () => dispatch(AllActionsCreators.changeStyle())
//   }
// }

const mapState = state => state;


const actionCreators = {
  toggleDarkmode,
  loadSettings,
  loadCourses,
  loadCustomSchool,
  toggleSelectCourse,
  changeStyle
}

export default connect(
  mapState,
  actionCreators
)(App);