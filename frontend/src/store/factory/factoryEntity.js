import {
  BaseEntity
  , CardEntity
  , DeckEntity

} from '~/entities/index'

const factoryEntity = ( () => {

    const entities = []

    //#region REGISTRE

    entities.push({
      name: 'DeckEntity'
      , service: DeckEntity
    })

    entities.push({
      name: 'CardEntity'
      , service: CardEntity
    })

    //#endregion

    return {
        /**
         * @returns {BaseEntity}
         */
        get : ( name ) => entities.find( e => e.name == name).service
    }

})()

export default factoryEntity
