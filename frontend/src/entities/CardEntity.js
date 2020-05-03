import BaseEntity from "~/entities/BaseEntity";

class CardEntity extends  BaseEntity {
  constructor() {
    super()

    this.Front = ''
    this.Verse = ''
    this.Deck = {}
  }
}

export default CardEntity
