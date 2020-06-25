import ExtendsModel from './ExtendsModel';
import {types} from '~/store/repository/expoSqliteOrm/index';

const __tableNameModel__ = "AddPendingOperations"

class AddPendingOperationsModel extends ExtendsModel {
  constructor(obj) {
    super(obj);

    this.Id /*************/ = obj.id
    this.TypeOperation /**/ = obj.type;
    this.EntityName /*****/ = obj.name
    this.DateEvent /******/ = (new Date()).toISOString();
  }

  static get columnMapping() {
    return {
      Id: {
        type: types.TEXT,
        primary_key: true,
      },
      EntityName: {
        type: types.TEXT,
        not_null: true,
      },
      TypeOperation: {
        type: types.TEXT,
        not_null: true,
      },
      DateEvent: {
        type: types.DATETIME,
        not_null: true,
      },
    };
  }

  static get tableName() {
    return __tableNameModel__;
  }
}

export default AddPendingOperationsModel
