/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types/User";

interface userContext {
    userData : User | undefined,
    setUserData : React.Dispatch<React.SetStateAction<User | undefined>>
}
const userContext = createContext<userContext | undefined>(undefined);

function useUserContext() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

interface ChildrenProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};

export { UserContextProvider, useUserContext };
