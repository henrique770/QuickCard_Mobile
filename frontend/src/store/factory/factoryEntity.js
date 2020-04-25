import BaseEntity from '~/entities/BaseEntity'

import DeckEntity from '~/entities/DeckEntity'


const factoryEntity = ( () => {

    const entities = []

    entities.push({
        name: 'DeckEntity'
        , service: DeckEntity
    })


    return {

        /**
         * @returns {BaseEntity}
         */
        get : ( name ) => entities.find( e => e.name == name).service
    }

})()

export default factoryEntity