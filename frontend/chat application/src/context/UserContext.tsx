import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
    loggedInUser: any,
    setLoggedInUser: (user: any) => void;
}

interface UserContextProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const user = useContext(UserContext);

    if(user === undefined) {
        throw new Error("useUserContext must be used with a UserContext")
    }
    return user;
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState<UserContextType>();

    return <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>{children}</UserContext.Provider>
}