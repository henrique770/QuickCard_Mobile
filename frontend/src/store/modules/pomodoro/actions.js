export function pomodoroTimer(data) {
  return {
    type: '@pomodoro/POMODORO_TIMER',
    payload: {data},
  };
}

export function inactivate() {
  return {
    type: '@pomodoro/INACTIVATE',
  };
}

export function pomodoroBreakTimer(data) {
  return {
    type: '@pomodoro/POMODORO_BREAK_TIMER',
    payload: {data},
  };
}

export function pomodoroSessionTimer(data) {
  return {
    type: '@pomodoro/POMODORO_SESSION_TIMER',
    payload: {data},
  };
}

export function ResetPomodoro(data) {
  return {
    type: '@pomodoro/RESET_POMODORO',
    payload: {data},
  };
}
