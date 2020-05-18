import { takeLatest, call, put, all } from 'redux-saga/effects';

import {  getDecks
  , setDecks
  , addDeckState
  , addCardState
  , updateCardState
} from './actions'

import {ServiceProxy , typeService } from '~/store/service'

export function* getDecksDataBase() {

    const serviceProxyDeck = new ServiceProxy(typeService.Deck)

    let decks = yield serviceProxyDeck
                      .include(typeService.Card, 'Cards', {
                        foryKey : 'Id'
                        , operKey : 'IdDeck_in'
                      })
                      .all()

    console.log('decks database', decks)

    yield put(setDecks({ data : decks }))
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

    console.log('entity:', entity)
    yield put(addCardState({ card : entity }))

}

export function* updateCardDataBase(data) {
    const { card } = data.payload
      , serviceProxy = new ServiceProxy(typeService.Card)
      , entity = yield serviceProxy.update(card)

    entity.Deck = {
      Id : card.Deck.Id
    }

    yield put(updateCardState({ card : entity }))
}

export default all([
    takeLatest('@decks/GET_DECKS', getDecksDataBase)
    , takeLatest('@decks/SET_DECKS', setDecksDataBase)
    , takeLatest('@decks/ADD_DECK_DATABASE', addDeckDataBase)
    , takeLatest('@decks/ADD_CARD_DATABASE', addCardDataBase)
    , takeLatest('@decks/UPDATE_CARD_DATABASE', updateCardDataBase)
])
