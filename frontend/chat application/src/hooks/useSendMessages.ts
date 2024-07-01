import {useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useMessageContext } from "../context/MessageContext";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useSendMessages = () => {
    const {authUser} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const {selectedUser} = useConversationContext();
    const {messages, setMessages} = useMessageContext();

    const sendMessage = async (message:string) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/messages/send/${selectedUser._id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json",
                    "jwtToken": JSON.parse(authUser)
                },
                body: JSON.stringify({message})
            })
            const data = await res.json()
            if(data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data.message])
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unknown error occurred while loging in");
            }
        } finally {
            setLoading(false);
        }
    }
    return {loading, sendMessage};
}