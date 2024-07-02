import { useEffect, useState } from "react";
import { useConversationContext } from "../context/ConversationContext"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useMessageContext } from "../context/MessageContext";

export const useGetMessages = () => {
    const {authUser} = useAuthContext();
    const [loading, setLoading] = useState(false)
    const {selectedUser} = useConversationContext();
    const {messages, setMessages} = useMessageContext();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/messages/${selectedUser._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "jwtToken": JSON.parse(authUser)
                    }
                })
                const data = await res.json()
                if(data.error) {
                    throw new Error(data.error)
                }
                console.log("neeru to get data details- " + data[0].senderId)
                setMessages(data)
            } catch (e) {
                if(e instanceof Error) {
                    toast.error(e.message)
                } else {
                    toast.error("An unknown error occured while fetching chat")
                }
            } finally {
                setLoading(false);
            }
        }
        if(selectedUser?._id)
            getMessages()
    }, [selectedUser?._id, setMessages])

    return {loading, messages}
}