import { typeService } from './typeService'
import RepositoryBase from '~/store/repository/repositoryBase'
import {getInstanceSynchronizationService} from '~/store/service/synchronizationService'
import NetInfo from "@react-native-community/netinfo";
const synchronizationService = getInstanceSynchronizationService()

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

  , updateState = (operation, resource) => {
      let source = {}
      if (Array.isArray(resource)) {
        state[operation].push(resource.map(ent => {
          source = {
            id: ent.Id
            , type: ent.constructor.name
          }
          return source;
        }))
      } else {
        source = {
          id: resource.Id
          , type: resource.constructor.name
        }
        state[operation].push(source)
        return source;
      }
    }

    /**
     *
     * @param {String} operation
     * @param {BaseEntity | BaseEntity[]} entity
     * @return {BaseEntity | BaseEntity[]}
     */
   , operationState = ( operation, entity ) => {
     let source = updateState(operation, entity)

      NetInfo.fetch().then( stateNet => {
        if(stateNet.isConnected) {

          synchronizationService.writeOperation(operation, source)
        }
        // disconnected
        else {
          synchronizationService.addPendingOperations(operation, source)
        }
      })

    return entity
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
