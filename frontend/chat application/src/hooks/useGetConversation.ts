import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

interface Conversation {
    _id: string,
    email: string,
    username: string,
    gender: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string,
    __v: string
}


const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>();
    const {authUser} = useAuthContext();


    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            console.log("abe oo " + authUser)
            try {
                const res = await fetch("http://localhost:3000/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "jwtToken": authUser
                    }
                }) 
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                console.log("skadhfkadfkhsfd " + data[0].profilePic) // ye to working hai bhyii
                setConversations(data)
            } catch(e) {
                if(e instanceof Error) {
                    toast.error(e.message)
                }
                else {
                    toast.error("An unknown error occurred while loging in");
                }
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    }, [])

    return {loading, conversations}
}

export default useGetConversation;