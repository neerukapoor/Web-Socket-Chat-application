import { BsSend } from "react-icons/bs";
import { useSendMessages } from "../../hooks/useSendMessages";
import { useState } from "react";

const MessageInput = () => {

    // const [message, setMessage] = useState("");
    // const {loading, sendMessage} = useSendMessages();
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if(!message)
    //         return;
    //     await sendMessage(message);
    //     setMessage("");
    // }

    return(
        <form className="px-4 my-3">
            <div className="w-full relative">
                <input 
                    type="text"
                    className="border p-2 text-sm rounded-lg block w-full border-gray-600"
                    placeholder="Send a message"
                    // onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {/* {loading? <span className="loading loading-spinner"></span> : <BsSend/>} */}
                    <BsSend/>
                </button>
            </div>
        </form>
    )
}

export default MessageInput;