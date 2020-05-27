import produce from 'immer';

const INITIAL_STATE = {
    data : []
}

export default function(state = INITIAL_STATE, action) {
    return produce( state, draft => {

        switch(action.type) {

            //#region DECK OPER

            case '@decks/GET_DECKS': {
                break;
            }

            case '@decks/SET_DECKS': {
                draft.data = action.payload.data
                break;
            }

            case '@decks/ADD_DECK_STATE': {
              let { deck } = action.payload
              draft.data.push(deck)
              break;
            }

            case '@decks/UPDATE_DECK_STATE' : {
              let { deck } = action.payload
                , indexOf = draft.data.map(e => e.Id).indexOf(deck.Id)

              if(indexOf > -1) {
                draft.data.splice(indexOf, 1)
                draft.data.push(deck)
              }
              break
            }

            //#endregion

            //#region CARD OPER

            case '@decks/ADD_CARD_STATE': {
              let { card } = action.payload
                , deck = draft.data.find( deck => deck.Id == card.Deck.Id).clone()
              if(deck) {
                let indexOfDeck = draft.data.map( e => e.Id).indexOf(card.Deck.Id)
                draft.data.splice(indexOfDeck, 1)

                deck.addCard(card)
                draft.data.push(deck)
              }
              break;
            }

            case '@decks/UPDATE_CARD_STATE': {
              let { card } = action.payload
                , deck = draft.data.find( deck => deck.Id == card.Deck.Id)
              if(deck) {
                let indexOfCard = deck.Cards.map( prop => prop.Id).indexOf(card.Id)
                  , indexOfDeck = draft.data.map( prop => prop.Id).indexOf(deck.Id)

                deck.Cards.splice(indexOfCard, 1)
                deck.Cards.push(card)

                draft.data.splice(indexOfDeck, 1)
                draft.data.push(deck)
                let aux = draft.data
                draft.data = []
                //draft.data = aux
              }
              break;
            }

            //#endregion

            default:
        }
    })
}
