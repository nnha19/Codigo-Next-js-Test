import React, { createContext, useContext, useMemo, useState } from "react";

interface AuthContextVal {
  username: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext({} as AuthContextVal);

interface IProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [username, setUserName] = useState<string | null>(null);

  const contextVal = useMemo(
    () => ({ username, setUserName }),
    [username, setUserName]
  );

  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
