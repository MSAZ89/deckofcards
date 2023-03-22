export default function Hands(props) {
  return (
    <div className="flex flex-wrap gap-4 mx-auto justify-center">
      {props.cards.map((card, index) => (
        <div
          key={index}
          className={`relative ${
            index % 2 === 0
              ? "border-red-500 border-2"
              : "border-green-500 border-2"
          }`}
        >
          <img
            className="sm:w-20 sm:h-24 w-24 h-36"
            src={card.image}
            alt={card.code}
            title={card.code}
          />
        </div>
      ))}
    </div>
  );
}
