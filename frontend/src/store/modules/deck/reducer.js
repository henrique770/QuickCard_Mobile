import produce from 'immer';

const INITIAL_STATE = {
    data : []
}

export default function(state = INITIAL_STATE, action) {
    return produce( state, draft => {

        switch(action.type) {

            //#region DECK OPER

            case '@decks/GET_DECKS': {
                console.log('action deck - GET : GET_DECKS')
                break;
            }

            case '@decks/SET_DECKS': {
                draft.data = action.payload.data
                console.log('action deck - SET : SET_DECKS')
                break;
            }

            case '@decks/ADD_DECK_DATABASE': {
                break;
            }

            case '@decks/ADD_DECK_STATE': {
                let { deck } = action.payload
                draft.data.push(deck)
                console.log('action deck - ADD STATE : ', action)
                break;
            }

            //#endregion

            //#region CARD OPER

            case '@decks/ADD_CARD_STATE': {
              let { card } = action.payload
                , indexOfDeck = draft.data.map( e => e.Id).indexOf(card.Deck.Id)
                , deck = draft.data[indexOfDeck]
              if(indexOfDeck > -1) {
                draft.data.splice(indexOfDeck, 1)
                deck.Cards.push(card)
                draft.data.push(deck)
              }
              else {
                console.log('Add card in deck - Deck not found')
              }
              console.log('action deck/card - ADD STATE : ', action)
              break;
            }

            case '@decks/UPDATE_CARD_STATE': {
              let { card } = action.payload
                , deck = draft.data.find( deck => deck.Id == card.Deck.Id)

              if(deck) {
                let index = deck.Cards
                              .map( prop => prop.Id)
                              .indexOf(card.Id)

                deck.Cards.splice(index, 1)
                deck.Cards.push(card)
              }
              console.log('action deck/card - ADD STATE : ', action)
              break;
            }

            //#endregion

            default:
        }
    })
}
