import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    userToken?: string;
    login: (credential: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    login: (_: string) => {},
    logout: () => {}
});

export function AuthProvider(props: { children : ReactNode }) {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  // Load token from cookies when app starts
  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  // Function to handle login success
  const login = (credential: string) => {
    console.log("Checking scopes");
        setUserToken(credential);
        Cookies.set("authToken", credential, { secure: true }); // Expires in 1 day
  };

  // Function to log out user
  const logout = () => {
    setUserToken(undefined);
    Cookies.remove("authToken");
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
