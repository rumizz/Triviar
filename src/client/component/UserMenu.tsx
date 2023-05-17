import { FC, useState } from "react";
import { useLoginStore } from "../store/loginStore";
import { FaUser } from "react-icons/fa";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const UserMenu: FC = () => {
  const { username, logout } = useLoginStore();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer flex flex-row items-center gap-2 text-white border-2 border-white rounded-md px-4 py-2"
      >
        <FaUser />
        {username}
      </div>
      {isOpen && (
        <Button
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
          className="w-full bg-white mt-2 !text-black justify-center"
        >
          Log out
        </Button>
      )}
    </>
  );
};

export default UserMenu;
