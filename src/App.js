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
  button: '#64AA8E',
  buttonHover: '#64AA8E',
  sidePanel: 'lightgrey',
  border: '#222',
  color: "#495057",
  breakpoint: "200px",
  selectedTerm: '#ddd',
  selectedCourse: 'grey',
  bgBody: 'white',
  bgUI: '#414141',
  buttonPrimaryBG: '#11A860',
  buttonPrimaryColor: '#ECECEC',
  buttonSecondaryBG: '#A2E1CA',
  buttonSecondaryColor: '#11A860'
}

const darkmodeTheme = {
  ...defaultTheme,
  bg: '#0d1117',
  bgAlt: '#161b22',
  button: '#30363d',
  buttonHover: '#777',
  sidePanel: 'darkgrey',
  border: '#ced4da',
  color: "white",
  selectedTerm: 'rgba(240, 240, 240, 0.2)',
  selectedCourse: 'white',
  bgBody: 'darkgrey',
  bgUI: '#30363d',
  buttonPrimaryBG: '#7bb',
  buttonPrimaryColor: '#fff',
  buttonSecondaryBG: '#7aa',
  buttonSecondaryColor: '#fff'
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
    //if (this.props.currentFocusedElm){
      // another fix
      setTimeout(() => {
        this.props.changeStyle();
      }, 500);
    //}
  }

  restoreSettings = () => {

    let currentSchool = localStorage.getItem(App.localStorageKey+"currentSchool")? JSON.parse(localStorage.getItem(App.localStorageKey+"currentSchool")): this.props.currentSchool;
    if (!this.props.schools[currentSchool]){
      currentSchool = customSchoolName;
    }
    this.props.loadSettings(
      {
        darkmode: localStorage.getItem(App.localStorageKey+"darkmode")? JSON.parse(localStorage.getItem(App.localStorageKey+"darkmode")): this.props.darkmode,
        stickyHeader: localStorage.getItem(App.localStorageKey+"stickyHeader")? JSON.parse(localStorage.getItem(App.localStorageKey+"stickyHeader")): this.props.stickyHeader,
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
      // this.props.loadCourses([[]], {}, []);
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
    stickyHeader: state.settings.stickyHeader,
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
    toggleSelected: () => dispatch(AllActionsCreators.toggleSelectCourse()),
    changeStyle: () => dispatch(AllActionsCreators.changeStyle())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);