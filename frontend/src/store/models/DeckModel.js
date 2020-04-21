import ExtendsModel from './ExtendsModel'
import { types } from 'expo-sqlite-orm'


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
            , IdStudent : {
                type: types.TEXT
                , not_null : false
            }
        }
    }

    static get tableName() {
        return __tableNameModel__
    }
}


export default DeckModel