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
    return this._notes;
  }
  set Notes(value) {
    this._notes = value;
  }

  get totalNotes() {
    return this.Notes.length;
  }
}

export default NotePadEntity;
