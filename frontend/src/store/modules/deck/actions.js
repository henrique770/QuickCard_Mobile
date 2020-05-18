
export function getDecks() {
    return {
        type: '@decks/GET_DECKS'
        , payload: {  }
    }
}

export function addDeck(deck){
    return {
        type: '@decks/ADD_DECK_DATABASE'
        , payload: { deck }
    }
}

export function addDeckState(deck) {
    return {
      type: '@decks/ADD_DECK_STATE'
      , payload: { deck }
    }
}

export function setDecks({ data }) {
    return {
        type: '@decks/SET_DECKS'
        , payload: { data }
    }
}


export function addCard(card) {
  return {
    type: '@decks/ADD_CARD_DATABASE'
    , payload: { card }
  }
}
export function updateCard({ card }) {
  return {
    type: '@decks/UPDATE_CARD_DATABASE'
    , payload: { card }
  }
}

export function addCardState({ card }) {
  return {
    type: '@decks/ADD_CARD_STATE'
    , payload: { card }
  }
}

export function updateCardState({ card }) {
  return {
    type: '@decks/UPDATE_CARD_STATE'
    , payload: { card }
  }
}
