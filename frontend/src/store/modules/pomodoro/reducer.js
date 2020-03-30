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

      default:
    }
  });
}
