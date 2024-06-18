import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
    return(
        <div className="">
            <SearchInput/>
            <div className="divider"/>
            <Conversations/>
            {/* <LogutButton/> */}
        </div>
    )
}

export default Sidebar;