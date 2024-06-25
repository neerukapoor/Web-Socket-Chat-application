import { ReactNode, createContext, useContext, useState } from "react";

interface ConversationContextType {
    selectedUser: any;
    setSelectedUser: (user: any) => void;
}

interface ConversationContextProviderProps {
    children: ReactNode
}

export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const useConversationContext = () => {
    const conversation = useContext(ConversationContext);

    if(conversation === undefined) {
        throw new Error("useConversationContext must be used with a ConversationContext")
    }
    return conversation;
}

interface ConversationProps {
    conversation: {
        _id: string
        username: string,
        profilePic: string
    }
}

export const ConversationContextProvider = ({children}: ConversationContextProviderProps) => {
    const [selectedUser, setSelectedUser] = useState<ConversationProps>();

    return <ConversationContext.Provider value={{selectedUser, setSelectedUser}}>{children}</ConversationContext.Provider>
};