import { BiColor } from "react-icons/bi";

interface Iprops {
  text: string;
  color: string;
  onClick?: (e: React.MouseEvent) => void;  // Accepts event parameter
}

export default function Button({ text, color , onClick}: Iprops) {
  return (
    <div className="">
      <button className={`px-8 py-4 text-body-md rounded whitespace-nowrap w-auto flex-shrink-0 ${color}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
