export default function Hands(props) {
  return (
    <div className="flex flex-wrap">
      {props.cards.map((card) => (
        <>
          <img className="w-20" src={card.image} alt={card.code} />
        </>
      ))}
    </div>
  );
}
