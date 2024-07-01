import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import useGetLoggedInUser from '../../hooks/useGetLoggedInUser';

const Home = () => {
    const {loading, loggedInUser} = useGetLoggedInUser();
    console.log("loggeddd " + loggedInUser)
    return (
        <div className=''>
            <div className='flex justify-end text-lg'>
                Hi : <span className='text-slate-600 font-bold'>{loggedInUser}</span>
            </div>
            <div className="flex justify-center items-center bg-slate-100 p-6 rounded-xl shadow-lg">
                <Sidebar/>
                <MessageContainer/>
            </div>
        </div>
    )
}

export default Home