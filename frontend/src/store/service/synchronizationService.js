import api from '~/services/api';
import NetInfo from "@react-native-community/netinfo";

import {
  DeckModel
  , CardModel
  , NotePadModel
  , UpdatePendingOperationsModel
  , AddPendingOperationsModel
} from '~/store/models'
import NoteModel from "~/store/models/NoteModel";
import {types} from "~/store/repository/expoSqliteOrm";


const synchronizationService = (() => {
  let self = {};

  const mapper = data => {
    return {
      decks : data.decks.map( deck => new DeckModel({
          Id /*********/ : deck._id
          , IsActive /**/ : deck.isActive
          , Name /******/ : deck.name
        }))
      , cards : ( data => {
        if(!data)
          return [];

        return data.map( card => new CardModel({
          Id /********************/ : card._id
          , IsActive /************/ : card.isActive
          , IdDeck  /*************/ : card.deck
          , Front /***************/ : card.front
          , Verse /***************/ : card.verse
          , DateLastView /********/ : card.dateLastView
          , DateNextView /********/ : card.dateNextView
          , NumDifficultCount /***/ : card.numDifficultCount
          , NumEasyCount /********/ : card.numEasyCount
          , NumGoodCount /********/ : card.numGoodCount
          , IsReviewed /**********/ : card.isReviewed
        }))
      })(...data.decks.map( deck => deck.card))
      , notePads : data.notePads.map( notePad => new NotePadModel({
        Id /**********/ : notePad._id
        , IsActive /**/ : notePad.isActive
        , Name /******/ : notePad.name
      }))
      , notes : ( data => {
        if(!data)
          return [];

        return data.map( note => new NoteModel({
          Id /************/ : note._id
          , IdNotePad /***/ : note.notePad
          , Title /*******/ : note.title
          , Content  /****/ : note.content
          , IsActive /****/ : note.isActive
        }))
      })(...data.notePads.map( notePad => notePad.note))
    }
  }

  ,
    /**
     *
     * @param {BaseModel[]} models
     * @return {Promise<void>}
     */
    saveModel = async models => {
      const checkIdValue = false

      console.log('modelos' ,  models)

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


    // clear database
    self.clearBase = async () => {
      return Promise.all([
        DeckModel.fromSql("DELETE FROM DECK")
        , DeckModel.fromSql("DELETE FROM NOTEPAD")
      ])
        .then( () => Promise.all([
          DeckModel.fromSql("DELETE FROM CARD")
          , DeckModel.fromSql("DELETE FROM NOTE")
        ]))
    }

  self.scriconize = async userEntity => {

    let response = await api.get(`synchronism/${userEntity.Id}`)
      , models = mapper(response.data)

    console.log('response api' , response.data)
    console.log(models)

    await self.clearBase()
      .then( async () => {
        await saveModel(models.decks)
        await saveModel(models.cards)
        await saveModel(models.notePads)
        await saveModel(models.notes)
      })
  }

  let stopOffileneCheckLoop = false
    , timeLoop = 1000 * 4
    , toSynchronize = false
    , toSyncPendilencesOffiline = async () => {
      const fnSync = async () => {
        return NetInfo.fetch().then( stateNet => {
          //console.log(`to sync Pendilences offiline -- isOffile : ${!stateNet.isConnected}`);

          // isOffline
          if(!stateNet.isConnected) {
            toSynchronize = true

            // isOn and Synchronize
          } else if(toSynchronize) {
            Promise.all([
              AddPendingOperationsModel.all()
              , UpdatePendingOperationsModel.all()
            ])
              .then( async data => {
                // disable update flag
                toSynchronize = false

                /**
                 * @param {String} typeOperation
                 * @param {BaseModel} baseModel
                 * @param {AddPendingOperations[] | UpdatePendingOperations[] } models
                 */
                const executePending = async (typeOperation, baseModel, models, ) => {
                  console.log(`pending -- ${typeOperation}` , models)

                  for(let i = 0; i < models.length; i += 1) {
                    let model = models[i]
                    console.log('Model pending -- ' , model)

                    await self.writeOperation(typeOperation, { id : model.Id , type : model.EntityName })
                    await baseModel.destroy(model.Id)
                  }
                }
                  , addOperations = data[0]
                  , updateOperations = data[1]

                await executePending('add', AddPendingOperationsModel, addOperations);
                await executePending('update', UpdatePendingOperationsModel, updateOperations);
              })
          }

          // loop trigger
          toSyncPendilencesOffiline()
        })
      }
      //stop loop trigger
      if(!stopOffileneCheckLoop)
        setTimeout( fnSync , timeLoop)
  }

  self.stopOffileneCheckLoop = () => {
    stopOffileneCheckLoop = true
  }

  self.starOffileneCheckLoop = () => {
    stopOffileneCheckLoop = false
    toSyncPendilencesOffiline()
  }

  /**
   *
   * @param {String} op
   * @param {Object} source
   * @return {Promise<void>}
   */
  self.addPendingOperations = async (op , source) => {

    const checkIdValue = false ,
      /**
       * @type {BaseModel}
       */
    model = (() => {
      switch (op) {
        case "add":
          console.log('adding pending to API')
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


  //#region Api scripting operations

  let getOperationRest = op => {
    switch (op) {
      case 'add':
        return api.post;
      case 'update':
        return api.put
      default:
        return () => {
          throw 'method not defined'
        }
    }
  }

  , getModelSource = async source => {
    switch (source.type) {

      case "DeckEntity":
        return DeckModel.find(source.id)

      case "CardEntity":
        return CardModel.find(source.id)

      case "NotePadEntity":
        return NotePadModel.find(source.id)

      case "NoteEntity":
        return NoteModel.find(source.id)

      default :
        throw `Entity not mapped to write operation in api - source entity : ${source.type}`
    }
  }

  , getUrlEntity = (op, source) => {
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
   *
   * @param {String} op
   * @param {Object} source
   * @return {Promise<void>}
   */
  self.writeOperation = async (op , source) => {
    console.log(`write operation -- ${op}` , source)
    let restMethodApi = getOperationRest(op)
      , url = getUrlEntity(op, source)
      , dataSource = await getModelSource(source)

    await restMethodApi(url, dataSource)
      .then( data => {

        console.log('Sucess operation url: ' + url, data.data)
      })
      .catch( err => {
        console.log('Error operation url: ' + url, err)
        if(err.response) {
          console.log('Response Error:' , err.response.data)
        }
      })
  }

  //#endregion

  return self
})()



export default synchronizationService;
