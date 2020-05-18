import BaseModel from "./ExtendsModel";
import {types} from "~/store/repository/expoSqliteOrm";

const __tableNameModel__ = 'Card'

class CardModel extends BaseModel{
    constructor(args)
    {
      super(args)
    }

    static get columnMapping() {
      return {
        Id : {
          type: types.TEXT
          , primary_key: true
        }
        , IdDeck : {
          type: types.TEXT
          , not_null: true
        }
        , Front : {
          type: types.TEXT
          , not_null: true
        }
        , Verse : {
          type: types.TEXT
          , not_null: true
        }
        , DateLastView : {
          type: types.DATE
          , not_null: false
        }
        , DateNextView : {
          type: types.DATE
          , not_null: false
        }
        , NumDifficultCount : {
          type: types.NUMERIC
          , not_null: false
        }
        , NumEasyCount : {
          type: types.NUMERIC
          , not_null: false
        }
        , NumGoodCount : {
          type: types.NUMERIC
          , not_null: false
        }
        , IsActive : {
          type: types.BOOLEAN
          , not_null : true
        }
      }
    }

    static get tableName() {
      return __tableNameModel__
    }
}


export default CardModel
