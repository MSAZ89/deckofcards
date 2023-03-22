import { useState, useEffect } from "react";
import Hands from "./comps/Hands";
import PrimaryButton from "./comps/ui/PrimaryButton";

function App() {
  const [card, setCard] = useState(null);
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    setCards([...cards, card]);
  };

  const drawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setCard(data.cards[0]);
    setRemaining(data.remaining);
    addCard(data.cards[0]);
  };

  const newDeck = async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/"
    );
    const data = await response.json();
    setRemaining(data.remaining);
    setDeckId(data.deck_id);
    setCards([]);
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
    <div className="flex  items-center flex-col bg-gray-800 text-white min-h-screen">
      {card ? (
        <>
          <PrimaryButton
            className="my-12"
            buttonText={
              remaining === 0 ? (
                <span className="p-20">Clear Cards</span>
              ) : (
                "Draw Card"
              )
            }
            onClick={drawCard}
            disabled={card.remaining === 0}
          />
          <p className="mb-12">
            Remaining cards in deck:{" "}
            <span className="font-semibold text-xl">
              {remaining === 0 ? (
                <span className="text-red-400">Empty Deck</span>
              ) : (
                remaining
              )}
            </span>
          </p>
          <div>
            <img src={card.image} alt={card.code} />
          </div>
        </>
      ) : (
        <>
          <PrimaryButton
            className="my-12"
            buttonText="New Deck"
            onClick={() => handleNewDeck()}
          >
            New Deck
          </PrimaryButton>
        </>
      )}
      {card && (
        <>
          <p className="mb-12">Deck id: ({deckId})</p>
        </>
      )}
      {card && <Hands cards={cards} />}
    </div>
  );
}

export default App;
