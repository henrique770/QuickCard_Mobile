import {
    DeckModel
    , CardModel
} from '~/store/models/index'


const factoryModel = ( () => {

    const models = []

    models.push(
      {
        name: 'DeckModel'
        , service: DeckModel
      }
      , {
        name: 'CardModel'
        , service: CardModel
      }
    )

    return {

        /**
         * @returns {BaseEntity}
         */
        get : ( name ) => models.find( e => e.name == name).service
    }

})()

export default factoryModel
