import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
    const {loading, conversations} = useGetConversation();
    console.log("aslkdf " + conversations)
    return (
        <div className="h-[26rem] py-2 flex flex-col overflow-auto">
            {/* <Conversation/> */}
            {
                conversations?
                conversations.map((conversation: any) => (
                    <Conversation key={conversation._id} conversation={conversation}/>
                )) : "hello"
            }

            {loading? <span className="loading loading-spinner"></span> : null}
        </div>
    )
}

export default Conversations;