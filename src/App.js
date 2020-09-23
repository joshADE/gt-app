import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import * as AllActionsCreators from './redux/index';
import './App.css';
import { StyledAppContainer } from './styles/components/appStyles';
import GlobalStyles from '../src/styles/base/base';
import Header from './componenets/layout/Header';
import About from './componenets/pages/About';
import Notification from './componenets/Notification';
import Instructions from './componenets/pages/Instructions';
import Home from './componenets/Home';
import Settings from './componenets/Settings';
import { customSchoolName } from './redux/settings/settingsReducer';

const defaultTheme = {
  bg: "#eee",
  bgAlt: '#999',
  button: '#899',
  buttonHover: '#899',
  sidePanel: 'lightgrey',
  border: '#222',
  color: "#495057",
  breakpoint: "200px",
}

const darkmodeTheme = {
  ...defaultTheme,
  bg: '#555',
  bgAlt: '#888',
  button: '#777',
  buttonHover: '#777',
  sidePanel: '#888',
  border: '#ced4da',
  color: "white"
}

class App extends Component {
  static apiurlpartial = '';
  static localStorageKey = 'courses';

  componentDidMount = () => {
    this.restoreSettings();
    this.populateCourseData();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.props.toggleSelected();
  }

  restoreSettings = () => {

    let currentSchool = localStorage.getItem(App.localStorageKey+"currentSchool")? JSON.parse(localStorage.getItem(App.localStorageKey+"currentSchool")): this.props.currentSchool;
    if (!this.props.schools[currentSchool]){
      currentSchool = customSchoolName;
    }
    this.props.loadSettings(
      {
        darkmode: localStorage.getItem(App.localStorageKey+"darkmode")? JSON.parse(localStorage.getItem(App.localStorageKey+"darkmode")): this.props.darkmode,
        currentSchool: currentSchool
      }
    );
    this.props.loadCustomSchool(
      localStorage.getItem(App.localStorageKey+customSchoolName)? JSON.parse(localStorage.getItem(App.localStorageKey+customSchoolName)): this.props.schools[customSchoolName]
    );
  }

  populateCourseData = () =>{
    const dataStringCourses = localStorage.getItem(App.localStorageKey);
    const dataStringPrereq = localStorage.getItem(App.localStorageKey+"prereq");
    const dataStringCoreq = localStorage.getItem(App.localStorageKey+"coreq");

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

  }


  render(){

      return(
        <ThemeProvider theme={this.props.darkmode?darkmodeTheme:defaultTheme}>
          <GlobalStyles />
          <Router>
            <div className="App">
              <StyledAppContainer>
                <Header />
                <Notification />
                <Route exact path="/" render={props => (
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



const mapStateToProps = state => {
  return {
    darkmode: state.settings.darkmode,
    schools: state.settings.schools,
    currentSchool: state.settings.currentSchool,
    prereq: state.courses.prereq,
    coreq: state.courses.coreq
  }
}


const mapDispatchToProps = dispatch => {
  return {
    toggleDarkmode: () => dispatch(AllActionsCreators.toggleDarkmode()),
    loadSettings: (items) => dispatch(AllActionsCreators.loadSettings(items)),
    loadCourses: (courses, prereq, coreq) => dispatch(AllActionsCreators.loadCourses(courses, prereq, coreq)),
    loadCustomSchool: (customSchoolSettings) => dispatch(AllActionsCreators.loadCustomSchool(customSchoolSettings)),
    toggleSelected: () => dispatch(AllActionsCreators.toggleSelectCourse())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);