export default function Hands(props) {
  return (
    <div className="flex flex-wrap gap-1 mx-auto">
      {props.cards.map((card, index) => (
        <div
          key={index}
          className={`relative ${
            index % 2 === 0
              ? "border-red-500 border-4"
              : "border-green-500 border-4"
          }`}
        >
          <img
            className="w-20"
            src={card.image}
            alt={card.code}
            title={card.code}
          />
        </div>
      ))}
    </div>
  );
}
