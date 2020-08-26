export function getNotePads() {
  return {
    type: '@notepads/GET_NOTEPADS',
    payload: {},
  };
}

export function addNotePad(notepad) {
  return {
    type: '@notepads/ADD_NOTEPAD_DATABASE',
    payload: {notepad},
  };
}

export function updateNotePad(notepad) {
  return {
    type: '@notepads/UPDATE_NOTEPAD_DATABASE',
    payload: {notepad},
  };
}

export function addNotePadState(notepad) {
  return {
    type: '@notepads/ADD_NOTEPAD_STATE',
    payload: {notepad},
  };
}

export function setNotePads({data}) {
  return {
    type: '@notepads/SET_NOTEPADS',
    payload: {data},
  };
}

export function addNote(note) {
  return {
    type: '@notepads/ADD_NOTE_DATABASE',
    payload: {note},
  };
}

export function updateNote(note) {
  return {
    type: '@notepads/UPDATE_NOTE_DATABASE',
    payload: {note},
  };
}
export function UpdateNoteState(note) {
  return {
    type: '@notepads/UPDATE_NOTE_STATE',
    payload: {note},
  };
}

export function AddNoteState(note) {
  return {
    type: '@notepads/ADD_NOTE_STATE',
    payload: {note},
  };
}

//#region UPDATE

export function updateNoteState({note}) {
  return {
    type: '@notepads/UPDATE_NOTE_STATE',
    payload: {note},
  };
}
/*
// UPDATE DATABASE
export function updateNote({note}) {
  return {
    type: '@notepads/UPDATE_NOTE_DATABASE',
    payload: {note},
  };
}
*/
// UPDATE STATE
export function updateNotePadState(notepad) {
  return {
    type: '@notepads/UPDATE_NOTEPAD_STATE',
    payload: {notepad},
  };
}

//#endregion
