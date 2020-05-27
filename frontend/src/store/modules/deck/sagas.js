import { takeLatest, call, put, all } from 'redux-saga/effects';

import {  getDecks
  , setDecks
  , addDeckState
  , addCardState
  , updateCardState
  , updateDeckState
} from './actions'

import {ServiceProxy , typeService } from '~/store/service'


const filterActive = data => {
  if(Array.isArray(data)) {
    return data.filter( e => e.IsActive)
  }

  if(data.IsActive) {
    return data
  }

  return null
}

export function* getDecksDataBase() {

    const serviceProxyDeck = new ServiceProxy(typeService.Deck)

    let decks = yield serviceProxyDeck
                      .include(typeService.Card, 'Cards', {
                        foryKey : 'Id'
                        , operKey : 'IdDeck_in'
                      })
                      .all()

    console.log('decks database', decks)

    yield put(setDecks({ data : filterActive(decks) }))
}

export function* setDecksDataBase() {

}

export function* addDeckDataBase(data) {

    const { deck } = data.payload
        , serviceProxy = new ServiceProxy(typeService.Deck)
        , entity = yield serviceProxy.add(deck)

    yield put(addDeckState(entity))
}

export function* addCardDataBase(data) {
    const { card } = data.payload
      , serviceProxy = new ServiceProxy(typeService.Card)
      , entity = yield serviceProxy.add(card)

      entity.Deck = {
        Id : card.IdDeck
      }

      yield put(addCardState({ card : entity }))
}

export function* updateCardDataBase(data) {
    const { card } = data.payload
      , serviceProxy = new ServiceProxy(typeService.Card)
      , update = async card => {
          let entity = await serviceProxy.update(card)
          entity.Deck = {
            Id : card.IdDeck
          }
          return entity
       }

       if(Array.isArray(card)) {
        for(let i = 0; i < card.length; i += 1) {
          let itemCard = card[i]

          let entity = yield update(itemCard)
          yield put(updateCardState({ card : entity }))
        }
      } else {
        let entity = yield update(card)
        yield put(updateCardState({ card : entity }))
      }
}

//#region

export function* updateDeckDataBase(data) {
  const { deck } = data.payload
    , serviceProxy = new ServiceProxy(typeService.Deck)
    , entity = yield serviceProxy.update(deck)

  yield put(updateDeckState(entity))
}

//#endregion

export default all([
    takeLatest('@decks/GET_DECKS', getDecksDataBase)
    , takeLatest('@decks/SET_DECKS', setDecksDataBase)
    , takeLatest('@decks/ADD_DECK_DATABASE', addDeckDataBase)
    , takeLatest('@decks/ADD_CARD_DATABASE', addCardDataBase)
    , takeLatest('@decks/UPDATE_CARD_DATABASE', updateCardDataBase)
    , takeLatest('@decks/UPDATE_DECK_DATABASE', updateDeckDataBase)
])
