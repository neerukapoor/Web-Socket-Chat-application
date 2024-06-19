import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
    return (
        <div className="flex justify-center items-center bg-slate-100 p-6 rounded-xl shadow-lg">
            <Sidebar/>
            <MessageContainer/>
        </div>
    )
}

export default Home