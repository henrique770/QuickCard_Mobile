import BaseEntity from '~/entities/BaseEntity';

/**
 * @type Note
 * @typedef Note
 */
class NoteEntity extends BaseEntity {
  constructor(args = {}) {
    super(args);

    this.Content = args.Content;
    this.IdNotePad = args.IdNotePad;
    this.Title = args.Title;
  }

  get Title() { return this._title; }
  set Title(value) { this._title = value; }

  get Content() { return this._content; }
  set Content(value) {
    this._content = value;
  }

  get IdNotePad() { return this._idNotePad; }
  set IdNotePad(value) {
    this._idNotePad = value;
  }
}

export default NoteEntity;
