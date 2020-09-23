import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import * as AllActionsCreators from '../redux/index';
import { CustomInput } from 'reactstrap';
import GPASettings from './GPASettings';
import App from '../App';
function Settings(props) {
  const changeDarkmode = () => {
    props.toggleDarkmode();
  }

  useEffect(() => {
    localStorage.setItem(App.localStorageKey+"darkmode", JSON.stringify(props.darkmode));
  },[props.darkmode]);
    return (
        <div>
          <CustomInput checked={props.darkmode} onChange={changeDarkmode} type="switch" id="nightModeSwitch" name="nightModeSwitch" label="Toggle NightMode" /> 
          <GPASettings /> 
        </div>
    )
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
)(Settings);
