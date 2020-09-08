import BaseEntity from "~/entities/BaseEntity";

/**
 * @type Card
 * @typedef Card
 */
class CardEntity extends  BaseEntity {

  constructor(args = {}) {
    super(args)

    this._dateLastView = args.DateLastView
    this._dateNextView = args.DateNextView
    this._numDifficultCount = args.NumDifficultCount
    this._numEasyCount = args.NumEasyCount
    this._numGoodCount = args.NumGoodCount
    this._verse = args.Verse
    this._front = args.Front
    this._deck = args.Deck
    this._isReviewed = args.IsReviewed
  }

  get NumDifficultCount() { return this._numDifficultCount }
  set NumDifficultCount(value) { this._numDifficultCount = value; }

  get NumEasyCount() { return this._numEasyCount }
  set NumEasyCount(value) { this._numEasyCount = value }

  get NumGoodCount() { return this._numGoodCount }
  set NumGoodCount(value) { this._numGoodCount = value }

  get Deck() { return this._deck }
  set Deck(value) { this._deck = value }

  set Front(value) { this._front = value }
  get Front() { return this._front }

  set Verse(value) { this._verse = value }
  get Verse() { return this._verse }

  set IsReviewed(value) {
    if(typeof value !== 'boolean')
      throw `IsReviewed not boolean: value -> ${value}`

    this._isReviewed = value
  }
  get IsReviewed() { return this._isReviewed }

  set DateNextView(value) {

    if(value === "" || value === undefined )
      return this._dateNextView = undefined

    this._dateNextView = (new Date(value)).toISOString()
  }

  get DateNextView() { return this._dateNextView }

  set DateLastView(value) {

    if(value === "" || value === undefined )
      return this._dateLastView = undefined

    this._dateLastView = (new Date(value)).toISOString()
  }

  get DateLastView() { return this._dateLastView }

  /**
   * set to card for revised
   */
  reviewed() {
    this.IsReviewed = true
  }

  hitEasy() {

    this.DateNextView = new Date((new Date()).setHours(72))
    this.NumEasyCount += 1
    this.reviewed()
  }

  hitGood() {
    this.DateNextView = new Date((new Date()).setHours(24))
    this.NumGoodCount += 1
    this.reviewed()
  }

  hitDifficult() {
    this.DateNextView = new Date((new Date()).setMinutes(10))
    this.NumDifficultCount += 1
    this.reviewed()
  }
}

export default CardEntity
