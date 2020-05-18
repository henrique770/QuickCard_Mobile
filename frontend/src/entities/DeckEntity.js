
import BaseEntity  from './BaseEntity'

class DeckEntity extends BaseEntity {

    constructor(args = {})
    {
      super(args)

      this._name = args.Name
      this._cards = args.Cards
    }

    get Name(){ return this._name }
    set Name(value) { this._name = value}

    get Cards() {
      if(this._cards === undefined)
        return []

      return  this._cards
    }
    set Cards(value) { return this._cards = value}

    getDeckRandom() {
      let countCards = this.Cards.length
        , indexRandom = Math.floor(Math.random() * countCards) + 1

      if(countCards === 0)
          return null

      return this.Cards[indexRandom - 1]
    }
}

export default DeckEntity
