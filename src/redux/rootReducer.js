import { combineReducers } from 'redux';

import courseReducer from './course/courseReducer';

const rootReducer = combineReducers({
   courses: courseReducer 
});

export default rootReducer;