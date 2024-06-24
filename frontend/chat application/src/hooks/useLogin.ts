import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

interface LoginParams {
    username: string,
    password: string
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async ({username, password}: LoginParams) => {
        const success = handleInputErrors({username, password})

        if (!success) 
            return;
        setLoading(true);
        
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({username, password})
            })
            const data = await res.json();
            localStorage.setItem("token", JSON.stringify(data.jwtToken));
            setAuthUser(data.jwtToken)
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unknown error occurred while loging in");
            }
        } finally {
            setLoading(false);
        }
    }
    
    return {loading, login};
}

export default useLogin;

function handleInputErrors({username, password}: LoginParams) {
    if(!username || !password) {
        toast.error("Please fill in all fields.")
        return false;
    }
    return true
}