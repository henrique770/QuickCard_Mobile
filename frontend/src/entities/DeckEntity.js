
import BaseEntity  from './BaseEntity'
import moment from 'moment'

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


  isNextVisibleCard() {
    let card = this.getNextCard()
    , date = moment(card.DateNextView)
    , nowDate = moment()

    console.log('next date', date)
    console.log('atual date', nowDate)


    // true - data is past
    return nowDate > date
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
}

export default DeckEntity
