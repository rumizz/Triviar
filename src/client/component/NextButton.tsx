export type NextButtonProps = {
  onClick: () => void;
  text: string;
};

export default function NextButton({ onClick, text }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-d rounded-full w-fit px-8 py-2 text-white font-bold drop-shadow-md absolute top-8 right-8"
    >
      <span className="drop-shadow-md">{text}</span>
    </button>
  );
}
