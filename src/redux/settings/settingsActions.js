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