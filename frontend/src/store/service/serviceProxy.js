import { typeService } from './typeService'
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

const ServiceProxy = (() => {

  const state = {
    add : [] ,
    update : []
  }
  , eventOperation = {
    add : 1 ,
    update : 2
  }

  , repository = () => {}

  , dispatch = () => {

    console.log('state proxy' , state)
  }
    ,

    /**
     *
     * @param {String} operation
     * @param {BaseEntity | BaseEntity[]} resource
     * @return {BaseEntity | BaseEntity[]}
     */
   operationState = ( operation, resource ) => {
     if(Array.isArray(resource)) {
       state[operation].push(resource.map( ent => {
        return {
          id : ent.Id
          , type : ent.constructor.name
        }
      }))
    }
    else {
      state[operation].push({
        id : resource.Id
        , type : resource.constructor.name
     })
    }

    dispatch()

    return resource
  }

  , handler = {
      /**
       * proxy provider of get
       * @param {RepositoryBase} target target object for proxy
       * @param {String} key repository property
       * @return { RepositoryBase | function(args) : BaseEntity }
       */
    get : (target , key) => {
     // console.log(`key target : ${key}`)

      if(key === 'add') {
        // replace target function
        return (args) => {
          return target.add(args)
            .then( entity => operationState('add', entity))
        }
      }

      if(key === 'update') {
        // replace target function
        return (args) => {
          return target.update(args)
            .then( entity => operationState('update', entity))
        }
      }

      if(target[key] !== undefined) {
        return target[key]
      }
    }
  }

  return function (type) {

    _validators._ctr(type)

    const repository = new RepositoryBase(type)

    return new Proxy(repository, handler)
  }
})()

export { ServiceProxy }
