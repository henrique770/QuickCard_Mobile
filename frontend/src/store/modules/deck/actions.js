
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

export function updateDeck(deck) {
  return {
    type: '@decks/UPDATE_DECK_DATABASE'
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


export function addCardState({ card }) {
  return {
    type: '@decks/ADD_CARD_STATE'
    , payload: { card }
  }
}



//#region UPDATE

export function updateCardState({ card }) {
  return {
    type: '@decks/UPDATE_CARD_STATE'
    , payload: { card }
  }
}

// UPDATE DATABASE
export function updateCard({ card }) {
  return {
    type: '@decks/UPDATE_CARD_DATABASE'
    , payload: { card }
  }
}

// UPDATE STATE
export function updateDeckState(deck) {
  return {
    type: '@decks/UPDATE_DECK_STATE'
    , payload: { deck }
  }
}

//#endregion
