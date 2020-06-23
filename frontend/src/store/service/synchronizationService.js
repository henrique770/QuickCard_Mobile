
import api from '~/services/api';
import {
  DeckModel
  , CardModel
} from '~/store/models'


const synchronizationService = (() => {

  const mapper = data => {
    return {
      decks : data.decks.map( d => new DeckModel({
         Id /*********/ : d._id
        , IsActive /**/ : d.isActive
        , Name /******/ : d.name
      }))
      , cards : ( data => {
        if(!data)
          return [];

        return data.map( card => new CardModel({
          Id /*************/ : card._id
          , IsActive /*****/ : card.isActive
          , IdDeck  /******/ : card.deck
          , Front /********/ : card.front
          , Verse /********/ : card.verse
          //, DateLastView : card.dateLastView
          //, DateNextView : card.dateNextView
          //, NumDifficultCount : card.numDifficultCount
          //, NumEasyCount : card.numEasyCount
          //, NumGoodCount : card.numGoodCount
          //, IsReviewed : card.isReviewed
        }))
      })(...data.decks.map( deck => deck.card))
      , notes : {}
      , notepads : {}
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

  let self = {};

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
        //await saveModel(models.notepads)
        //await saveModel(models.notes)
      })
  }


  //#region
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
      default :
        throw `Entity not mapped to write operation in api - url entity: ${source.type}`
    }

    if(op == "update")
      return `${path}/${source.id}`

    return path
  }

  //#endregion

  self.writeOperation = async (op , source) => {
    let restMethodApi = getOperationRest(op)
      , url = getUrlEntity(op, source)
      , dataSource = await getModelSource(source)

    await restMethodApi(url, dataSource)
      .then( data => {

      })
  }


  return self

})()



export default synchronizationService;
