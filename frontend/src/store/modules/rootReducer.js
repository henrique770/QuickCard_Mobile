import {combineReducers} from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import pomodoro from './pomodoro/reducer';

export default combineReducers({
  auth,
  user,
  pomodoro,
});
