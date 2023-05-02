import { FC, useContext } from "react";
import { PlayerStateContext } from "src/client/util/PlayerStateContext";

const Footer: FC<{}> = () => {
  const { name, score } = useContext(PlayerStateContext);

  return (
    <div className="font-bold absolute bottom-0 inset-x-0 bg-gray-800 flex items-center p-4 gap-4">
      <div className="bg-white px-4 py-1 rounded-md">{name}</div>
      <div className="grow" />
      <div className="bg-white px-4 py-1 rounded-md">{score}</div>
    </div>
  );
};

export default Footer;
