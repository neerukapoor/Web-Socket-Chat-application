import { useGetMessages } from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
    const {loading, messages} = useGetMessages();
    if(messages > 0) {
        console.log(messages.message)
    }
    
    return (
        <div className="px-1 flex-1 overflow-auto">
            <Message/>
        </div>
    )
}

export default Messages;