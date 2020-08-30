import { combineReducers } from 'redux';

import courseReducer from './course/courseReducer';
import settingsReducer from './settings/settingsReducer';

const rootReducer = combineReducers({
   courses: courseReducer,
   settings: settingsReducer
});

export default rootReducer;