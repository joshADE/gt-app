import * as settingsTypes from './settingsTypes';

const initialState = {
    darkmode: false,
}


const settingsReducer = (state = initialState, action) => {
    
    switch(action.type){
        case settingsTypes.TOGGLE_DARKMODE:
            return {
                ...state,
                darkmode: action.payload.darkmode
            };
        default: return state;
    }

}
export default settingsReducer; 