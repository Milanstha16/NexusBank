import { createContext, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext(null);

// Hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
