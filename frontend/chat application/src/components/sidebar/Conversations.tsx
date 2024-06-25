import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
    const {loading, conversations} = useGetConversation();
    return (
        <div className="h-[26rem] py-2 flex flex-col overflow-auto">
            {
                conversations? conversations.map((conversation) => (
                    <Conversation key={conversation._id} conversation={conversation}/>
                )) : null
            }
            {loading? <span className="loading loading-spinner"></span> : null}
        </div>
    )
}

export default Conversations;