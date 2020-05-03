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
                , deck = draft.data.find( deck => deck.Id == card.Deck.Id)

              if(deck) {
                deck.Cards.push(card)
                console.log('action deck/card - ADD STATE : ', action)
                break;
              }
            }

            //#endregion

            default:
        }
    })
}
