import { useState, useEffect } from "react";
import Hands from "./comps/Hands";
import PrimaryButton from "./comps/ui/PrimaryButton";
import WarningButton from "./comps/ui/WarningButton";
import { motion } from "framer-motion";

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
          <div className="flex items-center gap-8 justify-between">
            <PrimaryButton
              className="my-6"
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
            <WarningButton
              className="my-6"
              buttonText="New Deck"
              onClick={handleNewDeck}
            />
            <p className="mb-6">
              Remaining cards in deck:{" "}
              <span className="font-semibold text-xl">
                {remaining === 0 ? (
                  <span className="text-red-400">Empty Deck</span>
                ) : (
                  remaining
                )}
              </span>
            </p>
          </div>
          {
            //if the first letter of a card code is "A" then the card is an ace, add a div if the card is an ace
            card && card.code[0] === "A" && (
              <motion.div
                key={card.code}
                //initial x between -500 and positive 500
                initial={{ opacity: 0, scale: 1.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 bg-red-500 text-white font-bold text-2xl p-2 rounded w-32"
                whileHover={{ scale: 1.4 }}
              >
                <img src={card.image} alt={card.code} />
                <p>Draw #{cards.indexOf(card) + 1}</p>
              </motion.div>
            )
          }

          <div>
            <img className="w-40" src={card.image} alt={card.code} />
          </div>
        </>
      ) : (
        <>
          <WarningButton
            className="my-12"
            buttonText="New Deck"
            onClick={() => handleNewDeck()}
          >
            New Deck
          </WarningButton>
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
