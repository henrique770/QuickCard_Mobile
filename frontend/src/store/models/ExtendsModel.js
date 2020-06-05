import { BaseModel, types } from '~/store/repository/expoSqliteOrm/index'
import SqLite  from 'react-native-sqlite-storage'

const __databaseName__ = 'QuickCard'
 , __createLocation__ = '~QuickCard.db'
 , __DEBUG__ = true

 SqLite.DEBUG(__DEBUG__);

class ExtendsModel extends BaseModel {

    constructor(args)
    {
        super(args)
    }

    static get database() {
        return async() => SqLite.openDatabase({
            name: __databaseName__
            , createFromLocation : __createLocation__
          }
          , (e) => {
            //console.log('sucesso connect', e)
          } , () => {
            console.log('falha connect')
          } , (e) => {
            console.log("SQL Error: " + e)
          })
    }



}


export default ExtendsModel
