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
  }

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
