import { useState, useEffect } from "react";

function App() {
  const [card, setCard] = useState(null);
  const [deckId, setDeckId] = useState(null);

  const drawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setCard(data.cards[0]);
  };

  const newDeck = async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/"
    );
    const data = await response.json();
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
    <div>
      {card ? (
        <>
          <img src={card.image} alt="card" />
          <p>{deckId}</p>
        </>
      ) : (
        <>
          <p>Empty Deck</p>{" "}
          <button onClick={() => handleNewDeck()}>New Deck</button>
        </>
      )}
      {card && (
        <button onClick={drawCard} disabled={card.remaining === 0}>
          Draw a card
        </button>
      )}
    </div>
  );
}

export default App;
