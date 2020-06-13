import produce from 'immer';

const INITIAL_STATE = {
  data: [],
};
const operationsActions = [];

//#region ACTIONS

//#region LOAD NOTEPAD TO STATE
operationsActions['@notepads/SET_NOTEPADS'] = (state, draft, action) => {
  const compare = (a, b) => {
    return ('' + a.Name.toLowerCase()).localeCompare(b.Name.toLowerCase());
  };
  draft.data = [...action.payload.data].sort(compare);
};
//#endregion

//#region UPDATE STATE NOTEPAD
operationsActions['@notepads/UPDATE_NOTEPAD_STATE'] = (
  state,
  draft,
  action,
) => {
  let {notepad} = action.payload,
    data = [...draft.data],
    indexOf = data.map(e => e.Id).indexOf(notepad.Id);

  if (indexOf > -1) {
    data.splice(indexOf, 1);
    data.push(notepad);
  }
  draft.data = data;
};
//#endregion

//#region ADD STATE DECK
operationsActions['@notepads/ADD_NOTEPAD_STATE'] = (state, draft, action) => {
  let {notepad} = action.payload,
    data = [...draft.data];

  data.push(notepad);
  draft.data = data;
};
//#endregion

//#region UPDATE STATE NOTE
operationsActions['@notepads/UPDATE_NOTE_STATE'] = (state, draft, action) => {
  let {note} = action.payload,
    data = [...draft.data],
    notepad = data.find(notepad => notepad.Id === note.Notes.Id);
  if (notepad) {
    let indexOfNote = notepad.Notes.map(prop => prop.Id).indexOf(note.Id),
      indexOfNotePad = data.map(prop => prop.Id).indexOf(notepad.Id);

    notepad.Notes.splice(indexOfNote, 1);
    notepad.Notes.push(note);

    data.splice(indexOfNotePad, 1);
    data.push(notepad);

    draft.data = data;
  }
};
//#endregion

//#region ADD STATE NOTE
operationsActions['@notepads/ADD_NOTE_STATE'] = (state, draft, action) => {
  let {note} = action.payload,
    data = [...draft.data],
    notepad = data.find(notepad => notepad.Id === note.NotePad.Id);

  if (notepad) {
    let indexOfNotePad = draft.data.map(e => e.Id).indexOf(note.NotePad.Id);
    data.splice(indexOfNotePad, 1);

    notepad.addNote(note);
    data.push(notepad);

    draft.data = data;
  }
};
//#endregion

//#endregion

export default function(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    let operation = operationsActions[action.type];

    if (typeof operation === 'function') {
      operation(state, draft, action);
    } else {
      console.log(' - undefined action - ', action);
    }
  });
}
