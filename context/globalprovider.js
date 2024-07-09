import {
  useEffect,
  createContext,
  useContext,
  useState,
  Children,
} from "react";
import { getCurrentUser } from "../lib/appwrite";

// declare the context
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [user, SetUser] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          SetIsLoggedIn(true);
          SetUser(res);
        } else {
          SetIsLoggedIn(false);
          SetUser(null);
        }
        console.log("This is the " + res.name);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((error) => {
        console.log(error);
        SetIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        SetIsLoggedIn,
        user,
        SetUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
