import BaseEntity from "~/entities/BaseEntity";
import ConstantsBusiness from "~/constants/ConstantsBusiness"

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
    this._baseHours = args.BaseHours

    // --
    this._codEnumHit = args.CodEnumHit
    this._displayDeadline = args.DisplayDeadline
  }


  /**
   * @returns {Number}
   */
  get BaseHours() { return this._baseHours }
  set BaseHours(value) { this._baseHours = value }

  /**
   * @returns {Number}
   */
  get NumDifficultCount() { return this._numDifficultCount }
  set NumDifficultCount(value) { this._numDifficultCount = value; }

  /**
   * @returns {Number}
   */
  get NumEasyCount() { return this._numEasyCount }
  set NumEasyCount(value) { this._numEasyCount = value }

  /**
   * @returns {Number}
   */
  get NumGoodCount() { return this._numGoodCount }
  set NumGoodCount(value) { this._numGoodCount = value }

  /**
   * @returns {Deck}
   */
  get Deck() { return this._deck }
  set Deck(value) { this._deck = value }

  /**
   * @returns {String}
   */
  get Front() { return this._front }
  set Front(value) { this._front = value }

  /**
   * @returns {String}
   */
  get Verse() { return this._verse }
  set Verse(value) { this._verse = value }

  /**
   * @returns {Boolean}
   */
  get IsReviewed() { return this._isReviewed }
  set IsReviewed(value) {
    if(typeof value !== 'boolean')
      throw `IsReviewed not boolean: value -> ${value}`

    this._isReviewed = value
  }

  /**
   * @returns {Date}
   */
  get DateNextView() {

    if(this._dateNextView == undefined) {
      this._dateNextView = (new Date()).toISOString()
    }

    return this._dateNextView
  }
  set DateNextView(value) {
    if(value === "" || value === undefined )
      return this._dateNextView = undefined

    this._dateNextView = (new Date(value)).toISOString()
  }

  /**
   * @returns {Date}
   */
  get DateLastView() { return this._dateLastView }
  set DateLastView(value) {

    if(value === "" || value === undefined )
      return this._dateLastView = undefined

    this._dateLastView = (new Date(value)).toISOString()
  }

  /**
   * @returns {Date}
   */
  get DisplayDeadline() { return this._displayDeadline }
  set DisplayDeadline(value) {

    if (value === "" || value === undefined)
      return this._displayDeadline = undefined

    this._displayDeadline = (new Date(value)).toISOString()
  }

  /**
   * @returns {Number}
   */
  get CodEnumHit() { return this._codEnumHit }
  set CodEnumHit(value) { this._codEnumHit = value }


  /**
   * remover markings for card review for  possible
   */
  undoReviewCard() {
    this.BaseHours = 0
    this.IsReviewed = false
    this.DateNextView = new Date()
    this.CodEnumHit = ConstantsBusiness.Card.codDefault
    this._resetDisplayDeadline()
    this._resetHit()
  }

  /**
   * @returns {string}
   */
  getTimeHitEasy() {
    return this._processTimeLabel(this._addHours(new Date()
      , this._calculateBaseHours(this.NumEasyCount, ConstantsBusiness.Card.hitEasyTime)))
  }

  /**
   * @returns {string}
   */
  getTimeHitGood() {
    return this._processTimeLabel(this._addHours(new Date()
      , this._calculateBaseHours(this.NumGoodCount, ConstantsBusiness.Card.hitGoodTime)))
  }

  /**
   * @returns {string}
   */
  getTimeHitDifficult() {
    return '10 min'
  }

  hitEasy() {
    this.NumEasyCount += 1
    this._uploadNextDataView(this.NumEasyCount, ConstantsBusiness.Card.hitEasyTime, ConstantsBusiness.Card.codEasy)
  }

  hitGood() {
    this.NumGoodCount += 1
    this._uploadNextDataView(this.NumGoodCount, ConstantsBusiness.Card.hitGoodTime, ConstantsBusiness.Card.codGood)
  }

  hitDifficult() {

    let dateNextView = new Date(this.DateNextView)

    this.CodEnumHit = ConstantsBusiness.Card.codDifficult
    this.BaseHours = 0
    this.NumDifficultCount += 1
    this.DateNextView = (new Date(dateNextView.setMinutes( dateNextView.getMinutes() + ConstantsBusiness.Card.hitDifficultTime)))
    this._resetDisplayDeadline()
    this._checkThisReviewed()
  }

  _uploadNextDataView(countHit , defaultTimeHit, codTypeHit) {

    this.CodEnumHit = codTypeHit
    this.BaseHours = this._calculateBaseHours(countHit, defaultTimeHit)

    this.DateNextView = this._addHours(new Date(), this.BaseHours)
    this._checkDisplayDeadline()
    this._checkThisReviewed()
  }

  /**
   * check if this reviewed
   */
  _checkThisReviewed() {
    if(this.DisplayDeadline != undefined && (new Date(this.DateNextView) > (new Date(this.DisplayDeadline)))) {
      this.IsReviewed = true
    }
  }

  _checkDisplayDeadline() {
    if(this.DisplayDeadline == null) {
      this._resetDisplayDeadline()
    }
  }

  /**
   * @returns {number}
   */
  _calculateBaseHours(countHit, defaultHour) {
    if(countHit == null || countHit < 1 ) {
      return  defaultHour
    }

    if( countHit < 2 ) {
      return  defaultHour * 2
    }

    let i = countHit
      , recursiveCalculate = val => {

      if(i > 0) {
        i -= 1

       return recursiveCalculate(val * 2)
      }

      return val
    }

    return recursiveCalculate(defaultHour)
  }

  /**
   * @returns {string}
   */
  _processTimeLabel(date) {
    let currentData = new Date()

    let diff =(currentData.getTime() - date.getTime()) / 1000;
    diff /= (60 * 60);
    let hours = Math.abs(Math.round(diff));

    if(hours < 24) {
      return `${hours} Horas`
    }
    else if(hours >= 24 && hours < (24 * 30)) {
      return `${Math.floor(hours / 24)} dias`
    } else {
      return `${Math.floor((hours / 24) / 30)} Mês`
    }
  }

  _resetDisplayDeadline() {
    this.DisplayDeadline = this._addHours(new Date(), ConstantsBusiness.Card.dateLimit)
  }

  _resetHit() {
    this.NumEasyCount = 0
    this.NumGoodCount = 0
    this.NumDifficultCount = 0
  }

  _addHours(date, hours) {
    return new Date(date.setHours(date.getHours() + hours));
  }
}

export default CardEntity
