
import BaseEntity  from './BaseEntity'

class DeckEntity extends BaseEntity {

    constructor()
    {
        super()

        this.Name = ''
        this.Cards = []
        this.Student = {}
    }


    getDeckRandom() {
      let countCards = this.Cards.length
        , indexRandom = Math.floor(Math.random() * countCards) + 1

      if(countCards == 0)
          return null
      return this.Cards[indexRandom - 1]
    }
}

export default DeckEntity
