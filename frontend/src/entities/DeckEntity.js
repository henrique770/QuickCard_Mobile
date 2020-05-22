
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

  /**
   * returns card related to the deck
   * @return {Cards[]}
   * @constructor
   */
  get Cards() {
      if(this._cards === undefined)
        return []

      return this._cards
    }

  /**
   * insert card array to deck
   * @param value {Cards[]} - cards list
   * @constructor
   */
    set Cards(value) {

      if(this._cards === undefined)
        this._cards = []

      if (Array.isArray(value)) {
        this._cards.push(...value)
      }
      else if(typeof value === 'object') {
        this._cards.push(push)
      }
    }

  /**
   * check for cards on the deck
   * @return {boolean}
   */
  isEmpty() {
      return this.Cards.length === 0
    }

    getDeckRandom() {
      let countCards = this.Cards.length
        , indexRandom = Math.floor(Math.random() * countCards) + 1

      if(countCards === 0)
          return null

      return this.Cards[indexRandom - 1]
    }
}

export default DeckEntity
