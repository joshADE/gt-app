import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import * as AllActionsCreators from '../redux/index';
import { CustomInput } from 'reactstrap';
import GPASettings from './GPASettings';
import App from '../App';
import ImportExportSettings from './ImportExportSettings';
function Settings(props) {
  const changeDarkmode = () => {
    props.toggleDarkmode();
  }

  const changeStickyHeader = () => {
    props.toggleStickyHeader();
  }

  useEffect(() => {
    localStorage.setItem(App.localStorageKey+"darkmode", JSON.stringify(props.darkmode));
  },[props.darkmode]);

  useEffect(() => {
    localStorage.setItem(App.localStorageKey+"stickyHeader", JSON.stringify(props.stickyHeader));
  },[props.stickyHeader]);


    return (
        <div>
          <ImportExportSettings />
          <hr />
          <CustomInput checked={props.darkmode} onChange={changeDarkmode} type="switch" id="nightModeSwitch" name="nightModeSwitch" label="Toggle NightMode" />
          
          <CustomInput checked={props.stickyHeader} onChange={changeStickyHeader} type="switch" id="stickyHeaderSwitch" name="stickyHeaderSwitch" label="Sticky Row Headings (when scrolling left or right)" />  
          <hr />
          <GPASettings /> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
      darkmode: state.settings.darkmode,
      stickyHeader: state.settings.stickyHeader,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      toggleDarkmode: () => dispatch(AllActionsCreators.toggleDarkmode()),
      toggleStickyHeader: () => dispatch(AllActionsCreators.toggleStickyHeader()),
    }
  }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Settings);
