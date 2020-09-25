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
  draft.data = [...action.payload.data];//.sort(compare);
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

//#region ADD NOTE

operationsActions['@notepads/ADD_NOTE_STATE'] = (state, draft, action) => {
  let { note } = action.payload
    , notePad = draft.data.find( e => e.Id == note.IdNotePad);

  notePad.addNote(note);
  draft.data = notePad;
};


//#endregion

//#region

operationsActions['@notepads/UPDATE_NOTE_STATE'] = (state, draft, action) => {
  let { note } = action.payload,
    data = draft.data.find( e => e.Id == note.IdNotePad);

  //data.addNote(note);
  //draft.data = data;
};

//#endregion

//#region UPDATE NOT PAD

operationsActions['@notepads/UPDATE_NOTEPAD_STATE'] = (state, draft, action) => {
  let { notePad } = action.payload,
    newData = []

  for(let i = 0; i < draft.length ; i += 1) {
    let element = draft[i]
    if(element.Id !== notePad.Id) {
      newData.push(element)
    }
  }

  newData.push(notePad)
  draft = newData;
};

//#endregion

export default function(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    let operation = operationsActions[action.type];

    if (typeof operation === 'function') {
      operation(state, draft, action);
    } else {
      //console.log(' - undefined action - ', action.type);
    }
  });
}
