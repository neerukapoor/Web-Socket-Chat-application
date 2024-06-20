import { useState } from "react";
import toast from "react-hot-toast"

interface SignupParams {
    email: string;
    username: string;
    password: string;
    gender: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async({email, username, password, gender}: SignupParams) => {
        const success = handleInputErrors({email, username, password, gender})
        if(!success)
            return;
    
        setLoading(true)
        try {
            const res = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, username, password, gender})
            })

            const data = await res.json();
            console.log(data);
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setLoading(false)
        }
    }

    return {loading, signup}

}

export default useSignup;

function handleInputErrors({email, username, password, gender}: SignupParams) {
    if(!email || !username || !password || !gender) {
        toast.error("Please fill in all fields.")
        return false;
    }
    return true
}