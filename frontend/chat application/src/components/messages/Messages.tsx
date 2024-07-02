import { useGetMessages } from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton"

const Messages = () => {
    const {loading, messages} = useGetMessages();
    if(messages.length > 0) {
        messages.forEach((x) => console.log("msg neeru yaha: " + x.message.senderId))
    }
    
    return (
        <div className="px-1 flex-1 overflow-auto">

            {!loading && messages.length > 0 && messages.map((message) => (
                <Message key={message._id} message={message}/>
            ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className="text-center">Send a message to start conversation</p>
            )}
        </div>
    )
}

export default Messages;