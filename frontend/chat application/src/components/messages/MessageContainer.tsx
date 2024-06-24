import { TiMessage } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
    const noChatSelected = true;
    return(
        <>
        {noChatSelected ? (<NoChatSelected/>) : (
            <div className="min-w-[450px] h-[33rem] flex flex-col overflow-auto">
            <>
                <div className="bg-slate-500 px-4 py-2 mb-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-white font-bold">John doe</span>
                </div>
                
                <Messages/>
                <MessageInput/>
            </>
        </div>
        )}
        </>
    )
}

export default MessageContainer;

const NoChatSelected = () => {
    return(
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center font-semibold sm:text-lg md:text-xl flex flex-col items-center gap-2">
                <p>Welcome Jon 👋</p>
                <p>Select a Chat to Start Messaging</p>
                <TiMessage className="text-3xl md:text-6xl"/>
            </div>
        </div>
    )
}