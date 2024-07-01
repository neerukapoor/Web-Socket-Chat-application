import { useGetMessages } from "../../hooks/useGetMessages";

const Message = () => {
    
    return (
        <div className="chat chat-end overflow-auto">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/girl" alt="avatar image"/>
                </div>
            </div>

            <div className="chat-bubble">Hi! What's up?</div>
            <div className="chat-footer opacity-50">
                Seen at 12:46
            </div>
        </div>
    )
}

export default Message;