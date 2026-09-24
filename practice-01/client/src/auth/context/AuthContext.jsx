import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuhtProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be use within a Auth Provirder");
  }

  // user, setUser, accessToken, setAccessToken
  return context;
}
