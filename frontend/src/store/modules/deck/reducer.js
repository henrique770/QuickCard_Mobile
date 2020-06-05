import produce from 'immer';

const INITIAL_STATE = {
    data : []
}
const operationsActions = []

//#region ACTIONS

//#region LOAD DECK TO STATE
operationsActions['@decks/SET_DECKS'] = (state, draft, action) => {
  const compare = (a, b) => {
    return ('' + a.Name.toLowerCase()).localeCompare(b.Name.toLowerCase());
  }
  draft.data = [...action.payload.data].sort(compare)
}
//#endregion

//#region UPDATE STATE DECK
operationsActions['@decks/UPDATE_DECK_STATE'] = (state, draft, action) => {
  let { deck } = action.payload
    , data = [...draft.data]
    , indexOf = data.map(e => e.Id).indexOf(deck.Id)

  if(indexOf > -1) {
    data.splice(indexOf, 1)
    data.push(deck)
  }
  draft.data = data
}
//#endregion

//#region ADD STATE DECK
operationsActions['@decks/ADD_DECK_STATE'] = (state, draft, action) => {
  let { deck } = action.payload
    , data = [...draft.data]

  data.push(deck)
  draft.data = data
}
//#endregion

//#region UPDATE STATE CARD
operationsActions['@decks/UPDATE_CARD_STATE'] = (state, draft, action) => {
  let { card } = action.payload
    , data = [...draft.data]
    , deck = data.find( deck => deck.Id === card.Deck.Id)
  if(deck) {
    let indexOfCard = deck.Cards.map(prop => prop.Id).indexOf(card.Id)
      , indexOfDeck = data.map(prop => prop.Id).indexOf(deck.Id)

    deck.Cards.splice(indexOfCard, 1)
    deck.Cards.push(card)

    data.splice(indexOfDeck, 1)
    data.push(deck)

    draft.data = data
  }
}
//#endregion

//#region ADD STATE CARD
operationsActions['@decks/ADD_CARD_STATE'] = (state, draft, action) => {
  let { card } = action.payload
    , data = [...draft.data]
    , deck = data.find( deck => deck.Id === card.Deck.Id)

  if(deck) {
    let indexOfDeck = draft.data.map( e => e.Id).indexOf(card.Deck.Id)
    data.splice(indexOfDeck, 1)

    deck.addCard(card)
    data.push(deck)

    draft.data = data
  }
}
//#endregion

//#endregion

export default function(state = INITIAL_STATE, action) {
    return produce( state, draft => {

      let operation = operationsActions[action.type]

      if(typeof operation === 'function'){
        operation(state, draft,action )
      } else {
        console.log(' - undefined action - ' , action)
      }
    })
}
