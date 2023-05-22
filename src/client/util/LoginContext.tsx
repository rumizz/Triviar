import { ReactNode, createContext, useEffect, useMemo } from "react";

import LoginPage from "../page/Login";
import { useLoginStore } from "../store/loginStore";
import { proxyClient } from "./proxyClient";
import Loading from "../component/Loading";

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
  requireLogin,
}: {
  children: ReactNode;
  requireLogin?: boolean;
}) {
  const loginStore = useLoginStore();

  const { token, isLoggedIn } = useMemo(() => {
    return {
      token: loginStore.token,
      isLoggedIn: loginStore.isLoggedIn,
    };
  }, [loginStore]);

  useEffect(() => {
    async function loginAnonymously() {
      if (!token) {
        loginStore.setToken(await proxyClient.auth.loginAnonymously.query());
      }
    }
    loginAnonymously();
  }, [loginStore, token]);

  if (!token) {
    return <Loading />;
  }

  if (requireLogin && !isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <LoginContext.Provider value={{ token, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
