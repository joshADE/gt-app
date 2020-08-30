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


const defaultTheme = {
  bg: "#eee",
  bgAlt: '#999',
  button: '#899',
  buttonHover: '#788',
  sidePanel: 'lightgrey',
  border: '#222',
  color: "black",
  breakpoint: "200px",
}

const darkmodeTheme = {
  ...defaultTheme,
  bg: "#555",
  bgAlt: '#888',
  button: '#444',
  buttonHover: '#666',
  sidePanel: '#888',
  border: '#999',
  color: "white"
}

class App extends Component {
  static apiurlpartial = '';
  static localStorageKey = 'courses';


  render(){

      return(
        <ThemeProvider theme={this.props.darkmode?darkmodeTheme:defaultTheme}>
          <GlobalStyles />
          <Router>
            <div className="App">
              <StyledAppContainer>
                <Header />
                <Notification />
                <Route exact path="/" component={Home}/>
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
  }
}


const mapDispatchToProps = dispatch => {
  return {
    toggleDarkmode: () => dispatch(AllActionsCreators.toggleDarkmode()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);