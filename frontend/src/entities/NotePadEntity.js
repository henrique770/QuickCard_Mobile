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

    this.orderNotes();
  }

  get Name() {
    return this._name;
  }
  set Name(value) {
    this._name = value;
  }

  /**
   * returns note related to the deck
   * @return {Note[]}
   * @constructor
   */
  get Notes() {
    if (this._notes === undefined) return [];

    return this._notes.filter(e => e.IsActive);
  }

  /**
   * insert note array to deck
   * @param value {Note[]} - Notes list
   * @constructor
   */
  set Notes(value) {
    if (this._notes === undefined) this._notes = [];

    this._notes = value.filter(e => e.IsActive);
  }

  /**
   * check for Notes on the deck
   * @return {boolean}
   */
  isEmpty() {
    return this.totalNotes() === 0;
  }

  orderNotes() {
    if (this.totalNotes() === 0) return;

    let order = (a, b) => {
        if (a.DateNextView !== undefined && b.DateNextView !== undefined)
          return new Date(a.DateNextView) < new Date(b.DateNextView);

        return false;
      },
      NotesOrder = this.Notes.sort(order);

    this.Notes = NotesOrder;
  }

  /**
   * total Notes in deck
   * @return {number}
   */
  totalNotes() {
    return this.Notes.length;
  }

  removeNote(note) {
    let indexOf = this.Notes.map(note => note.Id).indexOf(note.Id);

    if (indexOf > -1) {
      this.Notes.splice(indexOf, 1);
      return true;
    }
    return false;
  }

  addNote(note) {
    this.Notes.push(note);
  }
}

export default NotePadEntity;
