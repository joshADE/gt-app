import * as settingsTypes from './settingsTypes';

export const toggleDarkmode = (toggleState = 'not_specified') => {
    if (toggleState === "not_specified") {
		return (dispatch, getState) => {
			dispatch({
				type: settingsTypes.TOGGLE_DARKMODE,
				payload: { darkmode: !getState().settings.darkmode },
			});
        }
    } else {
        return (dispatch, getState) => {
			dispatch({ type: settingsTypes.TOGGLE_DARKMODE, payload: { nightmode: toggleState } });
		};
    } 
}


export const setCurrentSchool = (currentSchool) => {
	return {
		type: settingsTypes.SET_CURRENT_SCHOOL,
		payload: { currentSchool }
	}
}

export const setSchoolGrades = (schoolName = 'none', schoolGrades) => {
	return {
		type: settingsTypes.SET_SCHOOL_GRADES,
		payload: { schoolName, schoolGrades }
	}
}

export const loadSettings = (items) => {
	return {
		type: settingsTypes.LOAD_SETTINGS,
		payload: { items }
	}
}

export const loadCustomSchool = (customSchoolSettings) => {
	return {
		type: settingsTypes.LOAD_CUSTOM_SCHOOL,
		payload: { customSchoolSettings }
	}
}
