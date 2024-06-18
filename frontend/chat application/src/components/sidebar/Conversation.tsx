const Conversation = () => {
    return(
        <div className="flex gap-3 items-center hover:bg-sky-200 rounded p-2 py-1 curson-pointer">
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/girl" alt="avatar image"/>
                </div>
            </div>
            <div>
                <p className="font-bold text-gray-500">John</p>
            </div>
        </div>
    )
}

export default Conversation;