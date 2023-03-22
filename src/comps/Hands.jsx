import { motion } from "framer-motion";
import { useState } from "react";

export default function Hands(props) {
  //a stateful variable to store the scale for all the cards
  const [cardsScale, setScale] = useState(1);

  return (
    <>
      <div className="flex flex-wrap gap-4 mx-auto px-20">
        {props.cards.map((card, index) => (
          <div
            key={index}
            className={`relative ${
              index % 2 === 0
                ? "border-red-500 border-2"
                : "border-green-500 border-2"
            }`}
          >
            <motion.div
              key={card.code}
              //initial x between -500 and positive 500
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-50"
              whileHover={{ scale: 1.4 }}
            >
              <img
                className="sm:w-20 sm:h-24 w-24 h-36"
                src={card.image}
                alt={card.code}
                title={card.code}
                style={{ transform: `scale(${cardsScale})` }}
              />
            </motion.div>
            <motion.div
              key={card.code}
              //initial x between -500 and positive 500
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bottom-0 left-0 bg-white text-black font-bold text-sm p-1 rounded z-50"
            >
              <p>Draw #{index + 1}</p>
            </motion.div>
          </div>
        ))}
      </div>
      <h2 className="mt-20 mb-4">Card Scale</h2>
      <div className="flex flex-wrap gap-4 mx-auto mb-20">
        <motion.button
          className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setScale(cardsScale + 0.1)}
        >
          +
        </motion.button>
        <motion.button
          className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setScale(cardsScale - 0.1)}
        >
          -
        </motion.button>
      </div>
    </>
  );
}
