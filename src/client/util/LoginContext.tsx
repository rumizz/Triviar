import { ReactNode, createContext } from "react";

import LoginPage from "../page/Login";
import { useLoginStore } from "../store/loginStore";

type LoginContextType = {
  token: string;
  isLoggedIn: boolean;
  setToken?: (token: string) => void;
};

const LoginContext = createContext<LoginContextType>({
  token: "",
  isLoggedIn: false,
});

export default function LoginContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { token, isLoggedIn } = useLoginStore();

  if (!isLoggedIn) {
    return <LoginPage />;
  }
  return (
    <LoginContext.Provider value={{ token, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
