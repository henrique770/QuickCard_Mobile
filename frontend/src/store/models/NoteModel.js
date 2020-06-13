import BaseModel from './ExtendsModel';
import {types} from '~/store/repository/expoSqliteOrm';

const __tableNameModel__ = 'Note';

class NoteModel extends BaseModel {
  constructor(args) {
    super(args);
  }

  static get columnMapping() {
    return {
      Id: {
        type: types.TEXT,
        primary_key: true,
      },
      IdNotePad: {
        type: types.TEXT,
        not_null: true,
      },
      Content: {
        type: types.TEXT,
        not_null: true,
      },
    };
  }

  static get tableName() {
    return __tableNameModel__;
  }
}

export default NoteModel;
