import automapper from 'automapper-js'
import api from '~/services/api'

import { typeService } from './typeService'

import factoryModel from '~/store/factory/factoryModel'
import factoryEntity from '~/store/factory/factoryEntity'

import RepositoryBase from '~/store/repository/repositoryBase'


//#region 

const _validators = {
    _ctr : (type) => {
        if(typeof type != 'string')
        {
            throw 'Argumento não é uma string'
        }
       
        let values = Object.values(typeService)
        
        if(!values.includes(type))
        {
            throw `${type} não esta registrado em typeService`
        }
    } 
}

//#endregion

class ServiceProxy {
   
    /**
    * @param {TypeService} type
    */
    constructor(type)
    {
        _validators._ctr(type)

        this._model = factoryModel.get(`${type}Model`)
        this._entity = factoryEntity.get(`${type}Entity`)
        this._repository = new RepositoryBase(this._model, this._entity)
    }

    //#region Repository read 

    _resolveTypeResultOutPut(result) {

        let data = automapper( this._entity, result )

        return data
    }

    async all() {

       return this._repository.all()
            .then( result => {

               return this._resolveTypeResultOutPut(result)
            })
    }

    //#endregion
    
}

export { ServiceProxy }