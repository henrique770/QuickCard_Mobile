import {combineReducers} from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import pomodoro from './pomodoro/reducer';
import deck from './deck/reducer';
import notepad from './notepad/reducer';

export default combineReducers({
  auth,
  user,
  pomodoro,
  deck,
  notepad,
});
