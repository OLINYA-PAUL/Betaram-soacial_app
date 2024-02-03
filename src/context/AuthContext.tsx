import React, { createContext, useContext, useState, useEffect } from "react";
import { IContextType, IUser } from "../../types/index";
import { getCurrentUser } from "../../src/lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  imageUrl: "",
  bio: "",
  name: "",
  userName: "",
  email: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext<IContextType>(INITIAL_STATE);

 const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const navigate = useNavigate();

  const checkAuthenticatedUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" 
      // localStorage.getItem("cookieFallback") === null
    ) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthenticatedUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContextProvider;
export const useUserContext = () => useContext(authContext);
