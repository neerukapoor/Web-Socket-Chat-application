import Messages from "./Messages";

const MessageContainer = () => {
    return(
        <div className="min-w-[450px] h-[33rem] flex flex-col overflow-auto">
            <>
                <div className="bg-slate-500 px-4 py-2 mb-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-white font-bold">John doe</span>
                </div>
                
                <Messages/>
                {/* <MessageInput/> */}
            </>
        </div>
    )
}

export default MessageContainer;