import { combineReducers } from 'redux';

import courseReducer from './course/courseReducer';
import settingsReducer from './settings/settingsReducer';
import focusReducer from './focus/focusReducer';

const rootReducer = combineReducers({
   courses: courseReducer,
   settings: settingsReducer,
   focus: focusReducer
});

export default rootReducer;