import produce from 'immer';

const INITIAL_STATE = {
  active: false,
  breakVal: 5,
  sessionVal: 25,
  time: null,
};

export default function pomodoro(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@pomodoro/POMODORO_TIMER': {
        draft.time = action.payload.time;
        break;
      }
      case '@pomodoro/INACTIVATE': {
        draft.active = false;
        break;
      }

      case '@pomodoro/POMODORO_BREAK_TIMER': {
        draft.time = action.payload.time;
        break;
      }

      case '@pomodoro/POMODORO_SESSION_TIMER': {
        draft.time = action.payload.time;
        break;
      }
      case '@pomodoro/RESET_POMODORO': {
        draft.active = false;
        draft.breakVal = 5;
        draft.sessionVal = 25;
        draft.time = action.payload.time;
        break;
      }

      default:
    }
  });
}
