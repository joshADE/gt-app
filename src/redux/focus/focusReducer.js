import * as focusTypes from './focusTypes';

const initialState = {
    currentFocusedElm: null,
    style: null
}



const focusReducer = (state = initialState, action) => {
    
    switch(action.type){
        case focusTypes.CHANGE_FOCUS:
            return {
                ...state,
                currentFocusedElm: action.payload
            }
        case focusTypes.CHANGE_STYLE:
            return {
                ...state,
                style: action.payload
            }
        case focusTypes.BLUR_FOCUS:
            return {
                ...state,
                currentFocusedElm: null,
                style: null
            }
        
        default: return state;
    }

}
export default focusReducer; 