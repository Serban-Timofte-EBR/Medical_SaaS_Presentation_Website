import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    role: string;
  } | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Load user from token on mount
  useEffect(() => {
    if (token) {
      const decodedUser = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: decodedUser.id,
        email: decodedUser.email,
        role: decodedUser.role,
      });
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decodedUser = JSON.parse(atob(newToken.split(".")[1]));
    setUser({
      id: decodedUser.id,
      email: decodedUser.email,
      role: decodedUser.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
