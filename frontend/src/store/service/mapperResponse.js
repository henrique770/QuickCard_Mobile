import { CardModel, DeckModel, NotePadModel, NoteModel} from "~/store/models";

const mapperDeck = function (deck) {
  return {
    Id /*********/ : deck._id
    , IsActive /**/ : deck.isActive
    , Name /******/ : deck.name
  }
}
export { mapperDeck }

const mapperCard = function (card) {
  return {
    Id /********************/ : card._id
    , IsActive /************/ : card.isActive
    , IdDeck  /*************/ : card.deck
    , Front /***************/ : card.front
    , Verse /***************/ : card.verse
    , DateLastView /********/ : card.dateLastView
    , DateNextView /********/ : card.dateNextView
    , NumDifficultCount /***/ : card.numDifficultCount
    , NumEasyCount /********/ : card.numEasyCount
    , NumGoodCount /********/ : card.numGoodCount
    , BaseHours /***********/ : card.baseHours
    , CodEnumHit /**********/ : card.codEnumHit
    , DisplayDeadline /*****/ : card.displayDeadline
    , IsReviewed /**********/ : card.isReviewed
  }
}

export { mapperCard }


const mapperNotPad = function (notePad) {
  return {
    Id /**********/ : notePad._id
    , IsActive /**/ : notePad.isActive
    , Name /******/ : notePad.name
  }
}
export { mapperNotPad }

const mapperNote = function (note) {
  return {
    Id /************/ : note._id
    , IdNotePad /***/ : note.notePad
    , Title /*******/ : note.title
    , Content  /****/ : note.content
    , IsActive /****/ : note.isActive
  }
}

export { mapperNote }

const mapper = data => {
  return {
    decks : data.decks.map( deck => new DeckModel(mapperDeck(deck)))
    , cards : ( data => {
      if(!data)
        return [];

      return data.map( card => new CardModel(mapperCard(card)))

    })(...data.decks.map( deck => deck.card))
    , notePads : data.notePads.map( notePad => new NotePadModel(mapperNotPad(notePad)))
    , notes : ( data => {
      if(!data)
        return [];

      return data.map( note => new NoteModel(mapperNote(note)))
    })(...data.notePads.map( notePad => notePad.note))
  }
}

export { mapper }
