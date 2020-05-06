import automapper from 'automapper-js'
import Guid from 'guid'
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
        this._repository = new RepositoryBase(this._model)
        this._extds = undefined
    }


    //#region REPOSITORY OPERATION EXTENSION

    include(type, prop, query) {

      let self = Object.assign({}, this)

      self.__proto__ = this.__proto__

      if(self._extds == undefined)
      {
        self._extds = []
      }

      self._extds.push({
        include : true
        , include_args : {type, prop, query }
      })

      return self
    }

    _solveIncludeEntity(result, extds) {
      let serviceProxyInclude = new ServiceProxy(extds.include_args.type)
        , query_args = extds.include_args.query
        , query = {
          foryKey : query_args.foryKey
          , operKey : query_args.operKey
          , key : Array.isArray(result) ? result.map( e => e[query_args.foryKey] ) : [result[query_args.foryKey]]
        }
        , key = query.operKey.split('_')[0]
        , where = {}
        , data = automapper( this._entity, result )

      where[query_args.operKey] = query.key

      return  serviceProxyInclude._repository
        .query({
          inn : query ,
          where
        })
        .then( result => {

          if(data == undefined)
          {
            return data
          }
          else if(Array.isArray(data))
          {
            for(let i = 0; i < data.length; i += 1)
            {
              let dataItem = data[i]
                , relatedItens = result.filter( itemResult => itemResult[key] == dataItem[query.foryKey] )

              if(relatedItens)
              {
                dataItem[extds.include_args.prop] = automapper( serviceProxyInclude._entity, relatedItens)
              }
            }
          }
          else {
            let relatedItens = result.filter( itemResult => itemResult[key] == dataItem[query.foryKey] )
            data[extds.include_args.prop] = automapper( serviceProxyInclude._entity, relatedItens)
          }

          return this._solveTypeResultOutPut(data)
        })
    }

    _solveTypeExtensionSwitch(result, extds) {
      switch (true) {

        case extds.include:
          return this._solveIncludeEntity(result, extds)

        default:
          return result
      }
    }

    //#endregion

    _solveTypeExtensionOutPut(result) {

      if(this._extds != null && this._extds.length)
      {
        let extds = this._extds.pop()

        return  this._solveTypeExtensionSwitch( result , extds )
      }

      return result
    }

    _solveTypeResultOutPut(result) {

        if(this._extds != null && this._extds.length)
        {
            return this._solveTypeExtensionOutPut(result)
        }

        return automapper( this._entity, result )
    }

    //#region Repository read

    async all() {

        return this._repository.all()
            .then( result => {
               return this._solveTypeResultOutPut(result)
            })
    }

    async where(query) {

      let self = this

      try {
        return this._repository
          .query(query)
          .then( result => {

            return self._solveTypeResultOutPut(result)
          })
      }
      catch (e) {
        console.log('Error:' , e)
        return { }
      }
    }

    //#endregion

    //#region Repository read

    async add(entitySource) {

        let entityData = automapper(this._model, entitySource)
          , self = this
        entityData.Id = Guid.raw()
        entityData.IsActive = true

      return this._model.create(entityData)
        .then( model => automapper(self._entity , model ))
    }

    //#endregion


}

export { ServiceProxy }
