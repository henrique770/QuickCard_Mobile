import {takeLatest, call, put, all} from 'redux-saga/effects';

import {
  getNotePads,
  setNotePads,
  addNotePadState,
  AddNoteState,
  updateNoteState,
  updateNotePadState,
  UpdateNoteState,
} from './actions';

import {ServiceProxy, typeService} from '~/store/service';
import NoteEntity from "~/entities/NoteEntity";
import NotePadEntity from "~/entities/NotePadEntity";
import { NotePad as NotePadConstantsBusiness  } from '~constants/ConstantsBusiness'

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
        serviceProxyNote = new ServiceProxy(typeService.Note);

  let notepads = yield serviceProxyNotePad
                          .include(typeService.Note, 'Notes', {
                            foryKey: 'Id',
                            operKey: 'IdNotePad_in',
                          })
                          .all()
                          
    , noteEmptyNotePad = yield serviceProxyNote.query({ IdNotePad : ''})

    , notePadDefault = new NotePadEntity({
      Name : NotePadConstantsBusiness.defaultNotePadName
      , Notes : [...noteEmptyNotePad.filter( e => e.IdNotePad === '')]
      , IsActive : true
      , Id : ''
    })
    
    if(notepads === undefined) {
      notepads = []
    }

    if(notePadDefault.totalNotes > 0) {
      notepads.unshift(notePadDefault)
    }

  yield put(setNotePads({data: filterActive(notepads)}));
}

export function* setNotepadsDataBase() {}

export function* addNotePadDataBase(data) {
  const {notepad} = data.payload,
    serviceProxy = new ServiceProxy(typeService.NotePad),
    entity = yield serviceProxy.add(notepad);

  yield put(addNotePadState(entity));
x}

export function* addNoteDataBase(data) {
  const {note} = data.payload
    , noteEntity = new NoteEntity(note)
    , serviceProxy = new ServiceProxy(typeService.Note)
    , model = yield serviceProxy.add(note);

  yield put(AddNoteState(noteEntity));

  console.log(model)

}

export function* updateNoteDataBase(data) {
  const {note} = data.payload
    , serviceProxy = new ServiceProxy(typeService.Note)
    , model = yield serviceProxy.update(note);

  yield put(UpdateNoteState(note));
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
 // takeLatest('@notepads/UPDATE_NOTE_DATABASE', updateNoteDataBase),
  takeLatest('@notepads/UPDATE_NOTEPAD_DATABASE', updateNotePadDataBase),
]);
