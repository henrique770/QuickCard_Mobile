export function pomodoroTimer(data) {
  return {
    type: '@pomodoro/POMODORO_TIMER',
    payload: {data},
  };
}
