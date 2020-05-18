import ExtendsModel from './ExtendsModel'
import { types } from '~/store/repository/expoSqliteOrm/index'


const __tableNameModel__ = 'Deck'

/**
 * @typedef Deck
 * @param {string} id - identificador do deck
 */
class DeckModel extends ExtendsModel {

    constructor(obj){
        super(obj)
    }

    static get columnMapping() {
        return {
            Id : {
                type: types.TEXT
                , primary_key: true
            }
            , Name : {
                type: types.TEXT
                , not_null: true
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


export default DeckModel
