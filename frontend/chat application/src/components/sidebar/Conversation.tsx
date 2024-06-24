interface Conversation {
    _id: string,
    email: string,
    username: string,
    gender: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string,
    __v: string
}

const Conversation = (key: any, conversation: Conversation) => {
    return(
        <>
            {console.log("ye vala " + conversation._id)}
            {console.log("idhar " + conversation._id)}
            {console.log("idhar2 " + conversation.profilePic)}
            <div className="flex items-center hover:bg-sky-200 rounded curson-pointer">
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="avatar image"></img>
                        {/* <img src="https://avatar.iran.liara.run/public/girl" alt="avatar image"/> */}
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