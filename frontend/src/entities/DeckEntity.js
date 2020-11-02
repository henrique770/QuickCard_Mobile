
import BaseEntity  from './BaseEntity'
import moment from 'moment'
import { Card as CardConstatnts } from '~constants/ConstantsBusiness'

/**
 * @type Deck
 * @typedef Deck
 */
class DeckEntity extends BaseEntity {

   constructor(args = {})
   {
    super(args)

    this._name = args.Name
    this._cards = args.Cards

     this.orderCards()
   }

   get Name(){ return this._name }
   set Name(value) { this._name = value}

  /**
   * returns card related to the deck
   * @return {Card[]}
   * @constructor
   */
  get Cards() {
      if(this._cards === undefined)
        return []

      return this._cards.filter( e => e.IsActive)
    }

  /**
   * insert card array to deck
   * @param value {Card[]} - cards list
   * @constructor
   */
  set Cards(value) {
    if(this._cards === undefined)
      this._cards = []

    this._cards = value.filter( e => e.IsActive)
  }

  /**
   * check for cards on the deck
   * @return {boolean}
   */
  isEmpty() {
      return this.totalCards() === 0
  }

  orderCards() {
    if(this.totalCards() === 0)
      return

    this.Cards = this.Cards.sort((a, b) => {
      if(a.DateNextView !== undefined && b.DateNextView !== undefined )
        return ((new Date(a.DateNextView).getTime()) - (new Date(b.DateNextView).getTime()))

      return false
    })
  }

  /**
   * total cards in deck
   * @return {number}
   */
  totalCards() {
    return this.Cards.length
  }

  /**
   * total cards reviewed
   * @return {number}
   */
  totalCardsReviewed() {

    return this.Cards.filter(card => card.IsReviewed).length
  }

  /**
   * total cards unreviewed
   * @return {number}
   */
  totalUnreviewedCards() {

    return this.totalCards() - this.totalCardsReviewed()
  }

  /**
   * total cards to review moment
   * @return {number}
   */
  totalCardsReviewMoment() {
    let self = this
      , cardsNoteReview = this.Cards.filter( e => !e.IsReviewed)

      if(cardsNoteReview.length < 1)
        return 0

      let cardsAvailable = cardsNoteReview.filter( card => self._isNextVisibleCard(card))
      return cardsAvailable.length
  }

  /**
   * total cards to cod Good
   * @return {number}
   */
  totalCardsGood() {

    return this.Cards.filter(c => c.CodEnumHit === CardConstatnts.codGood).length
  }

   /**
   * total cards to cod Easy
   * @return {number}
   */
  totalCardsEasy() {

    return this.Cards.filter( c => c.CodEnumHit === CardConstatnts.codEasy).length
  }

   /**
   * total cards to cod Difficult
   * @return {number}
   */
  totalCardsDifficult() {

    return this.Cards.filter( c => c.CodEnumHit === CardConstatnts.codDifficult).length
  }

  /**
   * check that all cards have been reviewed
   * @return {boolean}
   */
  checkRevisedDeck() {
    if(this.isEmpty())
     return false

    return this.totalCardsReviewed() === this.totalCards()
  }

  /**
   * Change cards to view
   */
  reviewCards() {
    //if(!this.checkRevisedDeck())
    //  return
    
    let cards = this.Cards

    for(let i = 0; i < this.totalCards(); i += 1) {
      let card = cards[i]
      card.undoReviewCard()
      console.log(card)
    }
  }

  /**
   * check if the next card is available
   * @returns {boolean}
   */
  isNextVisibleCard() {
    
    return this._isNextVisibleCard(this.getNextCard())
  }

  getNextCard() {

    this.orderCards()

    let unreviewedCards = this.Cards.filter( card => !card.IsReviewed)
      , countCards = unreviewedCards.length

    if(countCards === 0) {
      return null
    }

    let card = unreviewedCards[0]

    card.DateLastView = new Date()

    card.Deck = {
      Id : this.Id
    }

    return card
  }

  removeCard(card) {
    let indexOf = this.Cards.map(card => card.Id).indexOf(card.Id)

    if(indexOf > -1) {

      this.Cards.splice(indexOf, 1)
      return true
    }
    return false
  }

  addCard(card) {

    this.Cards.push(card)
  }

  _isNextVisibleCard(card) {
    let date = moment(card.DateNextView)
    , nowDate = moment()

    // true - data is past
    return nowDate > date
  } 
}

export default DeckEntity
