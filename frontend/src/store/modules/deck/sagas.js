import { takeLatest, call, put, all } from 'redux-saga/effects';

import {  getDecks
  , setDecks
  , addDeckState
  , addCardState
} from './actions'

import {ServiceProxy , typeService } from '~/store/service'

export function* getDecksDataBase() {

    const serviceProxy = new ServiceProxy(typeService.Deck)

    let data = yield serviceProxy.all()

    yield put(setDecks({ data }))
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

export default all([
    takeLatest('@decks/GET_DECKS', getDecksDataBase)
    , takeLatest('@decks/SET_DECKS', setDecksDataBase)
    , takeLatest('@decks/ADD_DECK_DATABASE', addDeckDataBase)
    , takeLatest('@decks/ADD_CARD_DATABASE', addCardDataBase)
])
