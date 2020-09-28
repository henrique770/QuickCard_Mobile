import api from '~/store/service/api';
import ConstantsBusiness from '~/constants/ConstantsBusiness'
import NetInfo from "@react-native-community/netinfo";
import RepositoryBase from '~/store/repository/repositoryBase'
import {
  mapper
  , mapperDeck
  , mapperCard
  , mapperNotPad
  , mapperNote
} from './mapperResponse'
import { getInstanceNetInfoObserver , notificationsType } from './netInfoObserverService'

import {
  DeckModel
  , CardModel
  , NotePadModel
  , UpdatePendingOperationsModel
  , AddPendingOperationsModel
} from '~/store/models'
import NoteModel from "~/store/models/NoteModel";
import {types} from "~/store/repository/expoSqliteOrm";
import Card from "~/pages/Decks/Card";

const netInfoObserver = getInstanceNetInfoObserver()

class synchronizationService {

  constructor() {
    this._IsmonitorPending = false
  }

  /**
   * mapper to data in to ModelBase
   * @param type {string}
   * @param source {Object}
   * @return {BaseModel}
   */
  getMapperModel(type, source) {
    switch (type) {
      case 'deck':
        return new DeckModel(mapperDeck(source))

      case 'card':
        return new CardModel(mapperCard(source))

      case 'notepad':
        return new NotePadModel(mapperNotPad(source))

      case 'note':
        return new NoteModel(mapperNote(source))

      default:
        throw 'unsupported type for mapping in getMapperModel: ' + type
    }
  }

    /**
     * save to entity in to model base
     * @param {BaseModel[]} models
     * @return {Promise<void>}
     */
    async saveModel(models){
      const checkIdValue = false
        , self = this

      for(let i = 0; i < models.length; i += 1) {
        let model = models[i];

          await model.save(checkIdValue)
            .then( e => {
              console.log(`model data save -- ${model.Id}`)
            })
            .catch( err => {
              // Tratar erro
              throw err
            })
      }
  }

  /**
   * clear to database
   * @return {Promise<unknown[]>}
   */
  async clearBase(){
      return Promise.all([
        DeckModel.fromSql("DELETE FROM DECK")
        , DeckModel.fromSql("DELETE FROM NOTEPAD")
      ])
        .then( () => Promise.all([
          DeckModel.fromSql("DELETE FROM CARD")
          , DeckModel.fromSql("DELETE FROM NOTE")
        ]))
  }

  /**
   * retrieve all student information saved in the ap
   * @param userEntity {StudentEntity}
   * @return {Promise<any>}
   */
  async scriconize(userEntity){

    let response = await api.get(`synchronism`)
      , models = mapper(response.data)
      , self = this

    await self.clearBase()
      .then( async () => {
        await self.saveModel(models.decks)
        await self.saveModel(models.cards)
        await self.saveModel(models.notePads)
        await self.saveModel(models.notes)
      })

    return response.data
  }

  /**
   * monitor pending update data
   * @return {Promise<void>}
   * @private
   */
  async monitorPending() {

    let self = this

    if(this._IsmonitorPending) {
      return
    }

    netInfoObserver.subscribe(notificationsType.IS_CONNECTED, () => {
      self._getPendingOperationsApi().then( dataApi => {
        self._getPendingOperationsModel().then( async data => {
             let addOperations = data[0]
               , updateOperations = data[1]

            await self._sendPendingData('add', AddPendingOperationsModel, addOperations, dataApi);
            await self._sendPendingData('update', UpdatePendingOperationsModel, updateOperations, dataApi);
            await self._receivePendingData(dataApi)
          })
        })
      })

    this._IsmonitorPending = true
  }

  /**
   * send pending data to api
   * @param typeOperation {string}
   * @param baseModel {BaseModel}
   * @param models {BaseModel[]}
   * @param dataApi {any[]}
   * @return {Promise<void>}
   * @private
   */
  async _sendPendingData(typeOperation, baseModel, models, dataApi) {
    let self = this
      , _existPendingDataToApi = (id) => dataApi.findIndex( e => e.target._id === id) > -1

    for(let i = 0; i < models.length; i += 1) {
      let model = models[i]
      console.log('Model pending -- ' , model)

      if(!_existPendingDataToApi(model.Id)) {

        // send to api
        await self.writeOperation(typeOperation, { id : model.Id , type : model.EntityName })
      }

      await baseModel.destroy(model.Id)
   }
  }

  /**
   * processing receive pending data to api
   * @param data {{ target : Object , source : Object}[]}
   * @return {Promise<void>}
   * @private
   */
  async _receivePendingData(data) {

    console.log('data receive', data)

    for(let i = 0; i < data.length; i += 1){
      let item = data[i]
        , model = this.getMapperModel(item.target.EntityName, item.source)
        , type =  item.target.EntityName.charAt(0).toUpperCase() + item.target.EntityName.slice(1)
        , repository = new RepositoryBase(type)

        // UPDATE - PUT
      if(item.target.TypeOperation === 'PUT'){
        await repository.update(model).catch( err => {
          console.log(err)
          throw 'Error during update of entity received from api'
        })

        // CREATE - POST
      } else {
        await model.save(false).catch( err => {
          console.log(err)
          throw 'Error during add of entity received from api'
        })
      }
    }
    // clear to pending to api
    await api.delete(ConstantsBusiness.Path.pending)
  }

  /**
   * retrieve list<BaseModel> of entities pending update
   * @return {Promise<BaseModel[][]>}
   * @private
   */
  async _getPendingOperationsModel() {
    return Promise.all([
       AddPendingOperationsModel.all()
       , UpdatePendingOperationsModel.all()
    ])
  }

  /**
   * retrieve list<BaseModel> of entities pending update
   * @return {Promise<BaseModel[][]>}
   * @private
   */
  async _getPendingOperationsApi() {
    let data = await api(ConstantsBusiness.Path.pending).then( data => data.data)

    return data
  }

  /**
   * add entity to the pending operations stack
   * @param {String} op
   * @param {Object} source
   * @return {Promise<void>}
   */
  async addPendingOperations(op , source){

    let checkIdValue = false
      , self = this
      , model = (() => {
      switch (op) {
        case "add":
          console.log('adding pending to API', source)
          return new AddPendingOperationsModel({
            id : source.id
            , type : op
            , name : source.type
          })
        case "update":
          console.log('update pending to API')
          return new UpdatePendingOperationsModel({
            id : source.id
            , type : op
            , name : source.type
          })
        default:
          throw `undefined operation: ${op}`;
      }
    })()

    return model.save(checkIdValue);
  }

  /**
   * retrieve request method
   * @param {string} op
   * @return {(<T=any, R=AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>)|(function(): void)}
   */
  getOperationRest(op){
    switch (op) {
      case 'add':
        return api.post;
      case 'update':
        return api.put
      default:
        throw 'method not defined'
    }
  }

  /**
   * retrieve model by id
   * @param {string} id
   * @param {string} type
   * @return {Promise<BaseModel>}
   */
  async getModelSource(id , type){
    switch (type) {

      case "deck":
      case "DeckEntity":
        return DeckModel.find(id)

      case "card":
      case "CardEntity":
        return CardModel.find(id)

      case "notepad":
      case "NotePadEntity":
        return NotePadModel.find(id)

      case "note":
      case "NoteEntity":
        return NoteModel.find(id)

      default :
        throw `Entity not mapped to write operation in api - source entity : ${type}`
    }
  }

  /**
   * retrieve url the entity
   * @param {string} op
   * @param {Object} source
   * @return {string}
   */
  getUrlEntity(op, source){
    let path = ''
    switch (source.type) {
      case "DeckEntity":
        path = '/Deck'
        break;

      case "CardEntity":
        path = '/Card'
        break;

      case "NotePadEntity":
        path = '/NotePad'
        break;

      case "NoteEntity":
        path = '/Note'
        break;

      default :
        throw `Entity not mapped to write operation in api - url entity: ${source.type}`
    }

    if(op == "update")
      return `${path}/${source.id}`

    return path
  }

  /**
   * write operation - proxy for sending to api
   * @param {String} op
   * @param {Object} source
   * @return {Promise<void>}
   */
  async writeOperation(op , source){
    //console.log(`write operation -- ${op}` , source)
    let self = this
      , restMethodApi = self.getOperationRest(op)
      , url = self.getUrlEntity(op, source)
      , dataSource = await self.getModelSource(source.id, source.type)

    // Activate the mobile flag in the request
    dataSource.TypeMobile = true

    await restMethodApi(url, dataSource)
      .then( data => {
        console.log('Success operation url: ' + url, data.data)
      })
      .catch( err => {
        console.log('Error operation url: ' + url, err)
        if(err.response) {
          console.log('Response Error:' , err.response.data)
        }
      })
  }

  /**
   * recover data the api - transform data to model
   * @param {Object} notification
   * @return {Promise<BaseModel>}
   */
  async getDataSourceModel(notification){

    console.log(notification)

    switch (notification.entity) {
      case 'deck':
        let deckData = await api.get(`deck/${notification.id}`).then( response => response.data )
        return this.getMapperModel('deck', deckData)

      case 'card':
        let carData = await api.get(`card/${notification.id}`).then( response => response.data )
        return this.getMapperModel('card', carData)

      case 'notepad':
        let notePadData = await api.get(`notepad/${notification.id}`).then( response => response.data )
        return this.getMapperModel('notepad', notePadData)

      case 'note':
        let noteData = await api.get(`note/${notification.id}`).then( response => response.data )
        return this.getMapperModel('note', noteData)
    }
  }


  /**
   * add API data to the database
   * @param {Object} notification
   * @return {Promise<void>}
   */
  async addSourceModel(notification) {
    let model = await this.getDataSourceModel(notification)
    console.log('Add model in notification: ' , model)
    await model.save(false)
  }

  /**
   * update API data to the database
   * @param {Object} notification
   * @return {Promise<void>}
   */
  async updateSourceModel(notification){
    let model = await this.getDataSourceModel(notification)
      , type =  notification.entity.charAt(0).toUpperCase() + notification.entity.slice(1)
      , repository = new RepositoryBase(type)
      , isAny = await repository.anyById(notification.id)

    //entity exists?
    if(isAny){
      console.log('Update (broke - to add) model in notification: ' , model)
      await repository.update(model)
    } else {
      console.log('Update model in notification: ' , model)
      await model.save(false)
    }

  }
}



let _instance = null

const getInstanceSynchronizationService = function () {

  if(_instance === null) {
    _instance = new synchronizationService()
  }

  return _instance
}

export { getInstanceSynchronizationService };
