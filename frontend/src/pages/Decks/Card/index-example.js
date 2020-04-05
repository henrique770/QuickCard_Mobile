import React, {useState, useEffect} from 'react';
function App() {
  const [flashcard, setFlashcards] = useState({
    cards: [
      {front: 'Hej', back: 'Hello'},
      {front: 'Varsågod', back: "You're welcome"},
      {front: 'Snälla', back: 'Please'},
      {front: 'Ursäkta mig', back: 'Excuse me'},
      {front: 'Jag förstår inte', back: 'I do not understand'},
      {front: 'Talar du engelska?', back: 'Do you speak English?'},
      {front: 'Vad heter du?', back: 'What is your name?'},
      {front: 'Offentlig telefon', back: 'Public telephone'},
      {front: 'Nyhetsbyrå', back: 'News agency'},
      {front: 'Ingång', back: 'Entrance'},
      {front: 'Utgång', back: 'Exit'},
      {front: 'Herrar', back: 'Men'},
      {front: 'Damer', back: 'Women'},
    ],
  });

  return (
    <div className="App">
      <Flashcards cards={flashcard} />
    </div>
  );
}

function Flashcards() {
  const [state, setState] = useState({cardIndex: 0});

  const arrowHandler = (left) => {
    const {cardIndex} = state;
    if (left) {
      if (cardIndex - 1 >= 0) {
        setState({cardIndex: cardIndex - 1});
      }
    } else {
      if (cardIndex + 1 < props.cards.length) {
        setState({cardIndex: cardIndex + 1});
      }
    }
  };

  return (
    <div className="flashcard-viewer noselect">
      <div className="flashcard-item-wrapper">
        <FlashcardItem
          cardIndex={state.cardIndex}
          card={props.cards[state.cardIndex]}
        />
      </div>
      <div>
        <NavButtons
          arrowHandler={arrowHandler}
          cardIndex={state.cardIndex}
          cardLength={props.cards.length}
        />
      </div>
    </div>
  );
}

function FlashcardItem(props) {
  const [state, setState] = useState({
    flipped: false,
    flipStyle: {transition: 'transform 0.5s'},
  });

  useEffect((prevProps) => {
    if (prevProps.cardIndex !== props.cardIndex) {
      setState({
        flipped: false,
        flipStyle: {},
      });
    }
  }, []);

  useEffect((prevProps) => {
    if (prevProps.cardIndex !== props.cardIndex) {
      setState({
        flipped: false,
        flipStyle: {},
      });
    }
  });

  const clickHandler = () => {
    setState({
      flipped: !state.flipped,
      flipStyle: {transition: 'transform 0.5s'},
    });
  };

  const rotation = state.flipped ? 180 : 0;
  const frontStyle = {
    ...state.flipStyle,
    transform: `rotateY(${rotation}deg)`,
  };
  const backStyle = {
    ...state.flipStyle,
    transform: `rotateY(${180 + rotation}deg)`,
  };
  return (
    <div className="flashcard-item" onClick={() => clickHandler()}>
      <div className="flashcard-item-inner" style={frontStyle}>
        <div className="flashcard-item-helper">front</div>
        {props.card.front}
      </div>
      <div className="flashcard-item-inner" style={backStyle}>
        <div className="flashcard-item-helper">back</div>
        {props.card.back}
      </div>
    </div>
  );
}

const NavButtons = (props) => {
  const leftStyle = props.cardIndex - 1 < 0 ? {opacity: 0.5} : {};
  const rightStyle =
    props.cardIndex + 1 >= props.cardLength ? {opacity: 0.5} : {};
  return (
    <div className="nav-buttons-wrapper">
      <div
        className="nav-arrow-btn"
        style={leftStyle}
        onClick={() => props.arrowHandler(true)}>
        &larr;
      </div>
      {`${props.cardIndex + 1}/${props.cardLength}`}
      <div
        className="nav-arrow-btn"
        style={rightStyle}
        onClick={() => props.arrowHandler(false)}>
        &rarr;
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
