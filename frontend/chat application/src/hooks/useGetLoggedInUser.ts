import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";

const useGetLoggedInUser = () => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const {loggedInUser, setLoggedInUser} = useUserContext();
    
    useEffect(() => {
        const getLoggedInUser = async () => {
            setLoading(true)
            try {
                const res = await fetch("http://localhost:3000/users/loggedInuser", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "jwtToken": JSON.parse(authUser)
                    }
                })
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                console.log("logged in vala " + data[0].username)
                setLoggedInUser(data[0].username)
            } catch (e) {

            } finally {
                setLoading(false)
            }
        }
        getLoggedInUser();
    },[])

    return {loading, loggedInUser}
}

export default useGetLoggedInUser;