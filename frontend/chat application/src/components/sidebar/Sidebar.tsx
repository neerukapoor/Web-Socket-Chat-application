import Conversations from "./Conversations";
import LogutButton from "./LogutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
    return(
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <SearchInput/>
            <div className="divider"/>
            <Conversations/>
            <LogutButton/>
        </div>
    )
}

export default Sidebar;