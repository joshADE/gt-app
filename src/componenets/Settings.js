import React from 'react'
import { connect } from 'react-redux';

import * as AllActionsCreators from '../redux/index';
import { CustomInput } from 'reactstrap';
function Settings(props) {
    return (
        <div>
          <CustomInput checked={props.darkmode} onChange={props.toggleDarkmode} type="switch" id="nightModeSwitch" name="nightModeSwitch" label="Toggle NightMode" />  
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
