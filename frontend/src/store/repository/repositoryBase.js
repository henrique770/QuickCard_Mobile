import Guid from 'guid'
import automapper from '~/store/service/automapper'
import { BaseModel, types } from './expoSqliteOrm/index'
import BaseEntity from '~/entities/BaseEntity'
import factoryModel from "~/store/factory/factoryModel";
import factoryEntity from "~/store/factory/factoryEntity";

/**
 * Data access repository for SQlite
 * @class RepositoryBase
 */
class RepositoryBase {

    /**
     * @param {string} type model instance type
     */
    constructor(type){

      this._model = factoryModel.get(`${type}Model`)
      this._entity = factoryEntity.get(`${type}Entity`)
      this._extds = undefined
    }

    //#region INCLUSION OPERATIONS SUPPORTED

    /**
     * Create query extension with inclusion
     * @param {String} type model instance type
     * @param {String} prop property on which the relocation will be loaded
     * @param {Object} query parameters for consultation
     * @return {RepositoryBase}
     */
    include(type, prop, query) {

      //Create copy of the repository instance
      let self = Object.assign({}, this)

      self.__proto__ = this.__proto__

      if(self._extds === undefined)
      {
        self._extds = []
      }

      self._extds.push({
        include : true
        , include_args : {type, prop, query }
      })

      return self
    }

    //#endregion

    //#region SUPPORT FOR EXTENSIONS

    //#region SUPPORT FOR CONSULTATION WITH INCLUSION

    /**
     * Resolve inclusion in the query
     * @param {BaseModel} result base query result
     * @param {Object} extds extension parameters
     * @return {Promise<BaseEntity>|Promise<BaseEntity[]>|*}
     * @private
     */
    _solveIncludeEntity(result, extds) {
      let reposiotryInclude = new RepositoryBase(extds.include_args.type)
        , query_args = extds.include_args.query
        , query = {
          foryKey : query_args.foryKey
          , operKey : query_args.operKey
          , key : Array.isArray(result) ? result.map( e => e[query_args.foryKey] ) : [result[query_args.foryKey]]
      }
        , key = query.operKey.split('_')[0]
        , where = {}
        , data = automapper( this._entity, result)

        where[query_args.operKey] = query.key

      return  reposiotryInclude._model.query({
          inn : query ,
          where
        })
        .then( result => {

          if(data === undefined)
          {
            return data
          }
          else if(Array.isArray(data))
          {
            for(let i = 0; i < data.length; i += 1)
            {
              let dataItem = data[i]
                , relatedItems = result.filter( itemResult => itemResult[key] === dataItem[query.foryKey] )

              if(relatedItems)
              {
                dataItem[extds.include_args.prop] = automapper( reposiotryInclude._entity, relatedItems)
              }
            }
          }
          else {
            let relatedItems = result.filter( itemResult => itemResult[key] === data[query.foryKey] )
            data[extds.include_args.prop] = automapper( reposiotryInclude._entity, relatedItems)
          }

          return this._solveTypeResultOutPut(data)
        })
    }

    //#endregion

    /**
     * Resolve query extension
     * @param {BaseModel} model
     * @param {Object} extds
     * @return {Promise<BaseEntity>|Promise<BaseEntity[]> |*
     * @private
     */
    _solveTypeExtensionSwitch(model, extds) {
      switch (true) {

        case extds.include:
          return this._solveIncludeEntity(model, extds)

        default:
          return model
      }
    }


  /**
   * Resolve answer model and extensions
   * @param {BaseModel} model
   * @return {Promise<BaseEntity>|Promise<BaseEntity[]> |*}
   * @private
   */
    _solveTypeResultOutPut(model) {

      if(this._extds != null && this._extds.length)
      {
        let extds = this._extds.pop()

        return this._solveTypeExtensionSwitch(model, extds)
      }

      return automapper( this._entity, model)
    }

    //#endregion

   /**
     * Add model
     * @param {Object} args
     * @returns {Promise<BaseEntity>}
     */
    async add(args) {

      let modelData = automapper(this._model, args)
        , self = this

      modelData.Id = Guid.raw()
      modelData.IsActive = true

      return this._model.create(modelData)
        .then( model => self._solveTypeResultOutPut(model))
    }

  /**
   * Update model
   * @param {Object} args
   * @returns {Promise<BaseEntity>}
   */
    async update(args) {

      let model = await this._model.find(args.Id)
        , modelKeys = Object.keys(model.constructor.columnMapping)
        , self = this

      for(let i = 0; i < modelKeys.length; i += 1){
        let key =  modelKeys[i]
          let modelValue = model[key]
          let entityValue = args[key]

        if(entityValue !== undefined && modelValue !== entityValue) {

          model[key] = entityValue
        }
      }

      //console.log('** --- UPDATE OPERATION --- **')
      //console.log('Update entity -> entity' , args)
      //console.log('Update entity -> model' , { ...model })

      return model.save()
        .then( res => {

          return self.getById(args.Id)
        })
    }

    /**
     * Retrieve models equivalent to the passed identifier
     * @param {string} id
     * @returns {Promisse<BaseEntity>}
     */
    async getById(id) {
      let self = this

      return this._model.find(id)
        .then( model => self._solveTypeResultOutPut(model))
    }

  /**
   * Recover all models
   * @returns {Promise<BaseEntity[]>}
   */
    async all() {

      let self = this

      return this._model.all()
        .then( model => self._solveTypeResultOutPut(model))
    }

    /**
     * Retrieve all models based on the search query
     * @returns {Promise<BaseEntity[]>}
     */
    async query(query) {

      let self = this

      return this._model.query(query)
        .then( model => self._solveTypeResultOutPut(model))
    }

  /**
   *
   */
  async anyById(id) {
    let self = this

    return this._model.anyById(id)
  }

}

export default RepositoryBase
