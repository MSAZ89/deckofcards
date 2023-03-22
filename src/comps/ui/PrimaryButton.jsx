export default function PrimaryButton({
  onClick,
  buttonText,
  disabled,
  className,
}) {
  return (
    <>
      <button
        className={
          className +
          " bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
        }
        disabled={disabled}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
