import BaseEntity from '~/entities/BaseEntity';
import { Note as NoteConstantsBusiness } from '~constants/ConstantsBusiness'



const replaceValuesTitle = (value) => {
  return value
    .replace('&nbsp;' , ' ')
}

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
      return this.processTitleEmpty(this.Content)
    }
  
    return this._title; 
  }

  set Title(value) {

    if(value === '' || value === undefined || value === NoteConstantsBusiness.defaultTitle) {

      value = ''
      this.IsEmptyTitle === true
    }

     this._title = value; 
  }

  get IsEmptyTitle() { 

    if( this._isEmptyTitle === undefined) {
      return false
    }

    return this._isEmptyTitle; 
  }
  
  set IsEmptyTitle(value) {

    if(this.Title === undefined || this.Title === '' || this.Title === NoteConstantsBusiness.defaultTitle) {
      value = true
    } 

    this._isEmptyTitle = value
  }

  processTitleEmpty(content){
    if(content.length >= NoteConstantsBusiness.maxLengthTitle) {
       
      return replaceValuesTitle(content.replace(/<[^>]*>/g, '').substring(0, NoteConstantsBusiness.maxLengthTitle) + '...')
    }
     
    return replaceValuesTitle(content.replace(/<[^>]*>/g, '').substring(0, content.length))
  }
}


export default NoteEntity;