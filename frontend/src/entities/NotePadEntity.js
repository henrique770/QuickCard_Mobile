import BaseEntity from './BaseEntity';

/**
 * @type NotePad
 * @typedef NotePad
 */
class NotePadEntity extends BaseEntity {
  constructor(args = {}) {
    super(args);

    this._name = args.Name;
    this._notes = args.Notes;
  }

  get Name() {
    return this._name;
  }
  set Name(value) {
    this._name = value;
  }

  get Notes() {
    if(this._notes === undefined)
      return  []

    return this._notes.filter( e => e.IsActive);
  }
  set Notes(value) {
    this._notes = value;
  }

  get totalNotes() {
    return this.Notes.filter( e => e.IsActive).length;
  }

  addNote(note) {
    this.Notes.push(note);
  }
}

export default NotePadEntity;
