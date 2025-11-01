import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [formData, setFormData] = useState({username: "", email: "", password: ""});
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_API_URL;

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${URL}/auth/register`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setMsg(data.msg || "Registered successfully!")
            setTimeout(() => {
                navigate('/login')
            }, 2000)

        }
        catch(error){
            setMsg("Registration failed. Try again.");
            console.log(error)
        }
    }

    return (
        <main className='flex justify-center items-center pt-24'>
        <div className="rounded-3xl p-10 bg-stone-900 text-white shadow-2xl">
            <h2 className='text-3xl text-center mb-5'>Sign Up</h2>
            <form 
                onSubmit={handleSubmit}
                className='flex flex-col justify-center items-center'>
                <p>{msg}</p>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.username}
                    className='m-3 p-3 w-75 border border-zinc-500 rounded-sm' 
                    onChange={handleChange}
                    required/>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={formData.email}
                    className='m-3 p-3 w-75 border border-zinc-500 rounded-sm' 
                    onChange={handleChange}
                    required/>
                <input 
                    name="password" 
                    type="password" 
                    placeholder='Enter password' 
                    value={formData.password}
                    className='m-3 p-3 w-75 border border-zinc-500 rounded-sm' 
                    onChange={handleChange}
                    required/>
                <p className='my-3 text-zinc-400'>Already have an account? <span className='text-purple-900 underline'><Link to="/">Login</Link></span></p>
                <button type="submit" className='bg-purple-900 px-3 py-2 rounded-xl mt-2 cursor-pointer hover:bg-purple-800'>Register</button>
            </form>
        </div>
    </main>
  )
}
