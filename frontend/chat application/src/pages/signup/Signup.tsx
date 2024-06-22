import { Link } from "react-router-dom"
import GenderCheckBox from "./GenderCheckBox"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"

const Signup = () => {

    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        password: '',
        gender: ''
    })

    const {loading, signup} = useSignup();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(),
        await signup(inputs)
    }

    const handleCheckboxChange = (gender: string) => {
        setInputs({ ...inputs, gender });
    }

    return (
        <div className="flex justify-center items-center bg-slate-100 p-6 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-[1rem]">
                    <h1 className="text-center text-3xl font-semibold text-blue-400">Chat Application</h1>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Email" value={inputs.email} 
                    onChange={(e) => setInputs({...inputs, email:e.target.value})}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username" value={inputs.username}
                    onChange={(e) => setInputs({...inputs, username:e.target.value})}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="password"  value={inputs.password}
                    onChange={(e) => setInputs({...inputs, password:e.target.value})}/>
                    </label>
                    
                    <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

                    <button className="btn text-blue-400 shadow-lg" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Signup"}
                    </button>

                    <Link to="/login" className="text-sm hover:underline text-right text-blue-400 hover:text-blue-600 mt-2 inline-block">
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup