import {
    DeckModel
} from '~/store/models/index'


const factoryModel = ( () => {

    const models = []

    models.push({
        name: 'DeckModel'
        , service: DeckModel
    })

    return {

        /**
         * @returns {BaseEntity}
         */
        get : ( name ) => models.find( e => e.name == name).service
    }

})()

export default factoryModel