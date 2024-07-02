import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext";

const Message = ({message}: any) => {
    const {authUser} = useAuthContext();
    const {selectedUser} = useConversationContext();

    const fromMe = message.senderId === selectedUser._id;
    console.log("sender id here - " + message.senderId)
    console.log("ids - " + selectedUser._id)
    console.log("from me? " + fromMe)
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedUser.profilePic
    const bubbleBgColor = fromMe ? 'bg-blue-500' : ""

    return (
        <div className={`chat ${chatClassName} overflow-auto`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="avatar image"/>
                </div>
            </div>

            <div className={`chat-bubble ${bubbleBgColor}` }>{message.message}</div>
            <div className="chat-footer opacity-50">
                Seen at 12:46
            </div>
        </div>
    )
}

export default Message;