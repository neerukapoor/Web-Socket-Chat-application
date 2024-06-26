import { ReactNode, createContext, useContext, useState } from "react"

interface MessagesContextType {
    messages: any
    setMessages: (message:any) => void
}

interface MessagesContextProviderProps {
    children: ReactNode
}

export const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessageContext = () => {
    const message = useContext(MessagesContext);

    if(message === undefined) {
        throw new Error("useMessagesContext must be used with a MessagesContext")
    }
    return message;
}

export const MessagesContextProvider = ({children} : MessagesContextProviderProps) => {
    const [messages, setMessages] = useState<MessagesContextType[]>();
    return <MessagesContext.Provider value={{messages, setMessages}}>{children}</MessagesContext.Provider>
}