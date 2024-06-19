const Conversation = () => {
    return(
        <>
            <div className="flex items-center hover:bg-sky-200 rounded curson-pointer">
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src="https://avatar.iran.liara.run/public/girl" alt="avatar image"/>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-gray-500">John</p>
                </div>
            </div>

            <div className="divider"/>
        </>
    )
}

export default Conversation;