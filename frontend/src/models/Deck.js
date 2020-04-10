import BaseModel from './BaseModel'

/**
 * @typedef Deck
 * @param {string} id - identificador do deck
 */
class Deck extends BaseModel {

    constructor(){
        super()
        this.name = ''
        //this.student = {}
        //this.card = []
    }
}

Deck.prototype.getUrl = () => '/deck'

export default Deck