import BaseEntity from '~/entities/BaseEntity';
import { Note as NoteConstatnsBusiness } from '~constants/ConstantsBusiness'

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
    this.IsEmptyTitle = args.IsEmptyTitle;
  }

  get IdNotePad() { return this._idNotePad; }
  set IdNotePad(value) {

    if(value === undefined)
      value = ''

    this._idNotePad = value;
  }

  get Content() { return this._content; }
  set Content(value) {
    this._content = value;
  }

  get Title() { 
    
    if(this.IsEmptyTitle) {
      return NoteConstatnsBusiness.getTitleByContent(this.Content)
    }
  
    return this._title; 
  }

  set Title(value) { this._title = value; }

  get IsEmptyTitle() { 

    if(this._isEmptyTitle === undefined) {

      return false;
    }

    return this._isEmptyTitle; 
  }
  
  set IsEmptyTitle(value) {

    if(value === undefined) {

      value = false
    } 

    this._isEmptyTitle = value
  }

}


export default NoteEntity;
