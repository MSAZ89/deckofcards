import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [card, setCard] = useState(null);
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);

  const drawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setCard(data.cards[0]);
    setRemaining(data.remaining);
  };

  const newDeck = async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/"
    );
    const data = await response.json();
    setRemaining(data.remaining);
    setDeckId(data.deck_id);
    setCard(null);
  };

  useEffect(() => {
    if (!deckId) {
      newDeck();
    } else if (!card) {
      drawCard();
    }
  }, [deckId, card]);

  const handleNewDeck = () => {
    newDeck();
  };

  return (
    <div className="app">
      {card ? (
        <>
          <button
            style={{ marginBottom: "30px", border: "1px solid lightgrey" }}
            onClick={drawCard}
            disabled={card.remaining === 0}
          >
            Draw a card
          </button>
          <div>
            <img src={card.image} alt={card.code} />
          </div>
        </>
      ) : (
        <>
          <p>Empty Deck</p>{" "}
          <button onClick={() => handleNewDeck()}>New Deck</button>
        </>
      )}
      {card && (
        <>
          <p>Remaining cards in deck: {remaining}</p>
          <p>Deck id: ({deckId})</p>
        </>
      )}
    </div>
  );
}

export default App;
