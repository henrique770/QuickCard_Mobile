import {takeLatest, call, put, all} from 'redux-saga/effects';

import {
  getNotePads,
  setNotePads,
  addNotePadState,
  addNoteState,
  updateNoteState,
  updateNotePadState,
} from './actions';

import {ServiceProxy, typeService} from '~/store/service';

const filterActive = data => {
  if (Array.isArray(data)) {
    return data.filter(e => e.IsActive);
  }

  if (data.IsActive) {
    return data;
  }

  return [];
};

export function* getNotePadsDataBase() {
  const serviceProxyNotePad = new ServiceProxy(typeService.NotePad);

  let notepads = yield serviceProxyNotePad
    .include(typeService.Note, 'Notes', {
      foryKey: 'Id',
      operKey: 'IdNotePad_in',
    })
    .all();

  console.log('notepads database', notepads);

  yield put(setNotePads({data: filterActive(notepads)}));
}

export function* setNotepadsDataBase() {}

export function* addNotePadDataBase(data) {
  const {notepad} = data.payload,
    serviceProxy = new ServiceProxy(typeService.NotePad),
    entity = yield serviceProxy.add(notepad);

  yield put(addNotePadState(entity));
}

export function* addNoteDataBase(data) {
  const {note} = data.payload,
    serviceProxy = new ServiceProxy(typeService.Note),
    entity = yield serviceProxy.add(note);

  entity.NotePad = {
    Id: note.IdNotePad,
  };

  yield put(addNoteState({card: entity}));
  yield getNotePadsDataBase();
}

export function* updateNoteDataBase(data) {
  const {note} = data.payload,
    serviceProxy = new ServiceProxy(typeService.Note),
    update = async note => {
      let entity = await serviceProxy.update(note);
      entity.NotePad = {
        Id: note.IdNotePad,
      };
      return entity;
    };

  if (Array.isArray(note)) {
    for (let i = 0; i < note.length; i += 1) {
      let itemNote = note[i];

      let entity = yield update(itemNote);
      yield put(updateNoteState({note: entity}));
    }
  } else {
    let entity = yield update(note);
    yield put(updateNoteState({note: entity}));
  }
}

export function* updateNotePadDataBase(data) {
  const {notepad} = data.payload,
    serviceProxy = new ServiceProxy(typeService.NotePad),
    entity = yield serviceProxy.update(notepad);

  yield put(updateNotePadState(entity));
  yield getNotePadsDataBase();
}

export default all([
  takeLatest('@notepads/GET_NOTEPADS', getNotePadsDataBase),
  takeLatest('@notepads/SET_NOTEPADS', setNotepadsDataBase),
  takeLatest('@notepads/ADD_NOTEPAD_DATABASE', addNotePadDataBase),
  takeLatest('@notepads/ADD_NOTE_DATABASE', addNoteDataBase),
  takeLatest('@notepads/UPDATE_NOTE_DATABASE', updateNoteDataBase),
  takeLatest('@notepads/UPDATE_NOTEPAD_DATABASE', updateNotePadDataBase),
]);
