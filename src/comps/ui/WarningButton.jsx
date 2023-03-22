import { motion } from "framer-motion";

export default function WarningButton({
  onClick,
  buttonText,
  disabled,
  className,
}) {
  return (
    <>
      <motion.button
        className={
          className +
          " bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
        }
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {buttonText}
      </motion.button>
    </>
  );
}
