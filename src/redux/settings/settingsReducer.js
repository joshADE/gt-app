import * as settingsTypes from './settingsTypes';
import AllSchools from '../../data/SchoolData.json';
export const customSchoolName = 'custom';
const customSchoolInitialState = [];
const schools = { 
    ...AllSchools, 
    [customSchoolName]: customSchoolInitialState, 
    'none' : [] 
};

const initialState = {
    darkmode: false,
    schools,
    currentSchool: 'none',
    stickyHeader: false
}


const settingsReducer = (state = initialState, action) => {
    
    switch(action.type){
        case settingsTypes.TOGGLE_DARKMODE:
            return {
                ...state,
                darkmode: action.payload.darkmode
            };
        case settingsTypes.TOGGLE_STICKY_HEADER:
            return {
                ...state,
                stickyHeader: action.payload.stickyHeader
            }
        case settingsTypes.SET_CURRENT_SCHOOL:
            return {
                ...state,
                currentSchool: action.payload.currentSchool
            };
        case settingsTypes.SET_SCHOOL_GRADES:
            return {
                ...state,
                schools: (action.payload.schoolName !== 'none')
                ? {...schools, [action.payload.schoolName]: action.payload.schoolGrades}
                : {...schools, [state.currentSchool]: action.payload.schoolGrades}
            }

        case settingsTypes.LOAD_SETTINGS:
            return Object.assign({}, state, action.payload.items);
        case settingsTypes.LOAD_CUSTOM_SCHOOL:
            return {
                ...state,
                schools: {
                    ...schools, 
                    [customSchoolName]: action.payload.customSchoolSettings
                }
            }
        default: return state;
    }

}
export default settingsReducer; 