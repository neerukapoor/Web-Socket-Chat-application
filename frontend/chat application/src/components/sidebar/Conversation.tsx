import { useConversationContext } from "../../context/ConversationContext";

interface ConversationProps {
    conversation: {
        _id: string
        username: string,
        profilePic: string
    }
}

const Conversation: React.FC<ConversationProps> = ({conversation}) => {
    const {selectedUser, setSelectedUser} = useConversationContext();

    const isSelectedUser = selectedUser?._id === conversation._id

     return(
        <>
            <div className={`flex items-center hover:bg-sky-200 rounded curson-pointer gap-2 p-2 ${isSelectedUser? "bg-blue-200" : ""}`}
            onClick={() => setSelectedUser(conversation)}>
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="avatar image"></img>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-gray-500">{conversation.username}</p>
                </div>
            </div>

            <div className="divider"/>
        </>
    )
}

export default Conversation;