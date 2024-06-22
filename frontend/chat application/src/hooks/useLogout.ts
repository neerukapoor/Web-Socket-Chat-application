import { useState } from "react"

const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        try {
            // const res = await fetch("http://localhost:3000/auth/logout")
            // do this part later
        } catch (e) {

        }
        finally {
            setLoading(false)
        }
    }
}

export default useLogout;