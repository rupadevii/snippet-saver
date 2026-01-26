import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAPI } from '../utils/api';

export default function Register() {
    const [formData, setFormData] = useState({username: "", email: "", password: ""});
    const [msg, setMsg] = useState({});
    const [errors, setErrors] = useState({username: "", email: "", password: ""})
    const navigate = useNavigate();
    const emailValidator = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isFormValid = !errors.username && !errors.email && !errors.password

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value.trim()}))
        
        let error = ""
        if(name === "username" && value.trim().length<4){
            error = "Username must be at least 4 chars long";
        }

        if(name === "email" && !emailValidator.test(value.trim())){
            error = "Enter valid email!"
        }

        if(name === "password" && value.length<8){
            error = "Password must be at least 8 chars long!";
        }

        setErrors((prev) => ({...prev, [name]: error}));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let submitErrors = {}

        Object.entries(formData).forEach(([key, value]) => {
            if(value.trim() === "") submitErrors[key] = `${key[0].toUpperCase() + key.slice(1)} is required!`
        })

        setErrors(submitErrors)

        if(formData.username && formData.email && formData.password){
            try{
                const data = await fetchAPI('auth/register', {formData})
                setMsg({success: data.msg || "Registered successfully!"})
                setTimeout(() => {
                    navigate('/login')
                }, 2000)  
            }
            catch(error){
                setMsg({error: "Registration failed. Try again."});
                console.log(error)
            }
        }
        
    }

    return (
        <main className='flex justify-center items-center pt-24'>
        <div className="rounded-3xl p-10 bg-stone-900 text-white shadow-2xl">
            <h2 className='text-3xl text-center mb-5'>Sign Up</h2>
            <form 
                noValidate
                onSubmit={handleSubmit}
                className='flex flex-col justify-center items-center'>
                {msg.success && (<p className="text-green-500">{msg.success}</p>)}
                {msg.error && (<p className="text-red-500">{msg.error}</p>)}

                <input 
                    name="username" 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.username}
                    className='m-2 p-3 w-75 border border-zinc-500 rounded-sm' 
                    onChange={handleChange}
                />
                {errors.username && (<p className='text-red-600 self-start ml-3'>{errors.username}</p>)}
                
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter email" 
                    value={formData.email}
                    className='m-2 p-3 w-75 border border-zinc-500 rounded-sm' 
                    onChange={handleChange}
                />
                {errors.email && (<p className='text-red-600 self-start ml-3'>{errors.email}</p>)}

                <input 
                    name="password" 
                    type="password" 
                    placeholder='Enter password' 
                    value={formData.password}
                    className='m-2 p-3 w-75 border border-zinc-500 rounded-sm' 
                    onChange={handleChange}
                />
                {errors.password && (<p className='text-red-600 self-start ml-3'>{errors.password}</p>)}

                <p className='my-3 text-zinc-400'>
                    Already have an account? <span className='text-purple-900 underline hover:text-white'><Link to="/">Login</Link></span>
                </p>
                <button 
                    type="submit" 
                    className='bg-purple-900 px-3 py-2 rounded-xl mt-2 cursor-pointer hover:bg-purple-800 disabled:bg-purple-950 disabled:cursor-not-allowed' 
                    disabled={!isFormValid}>
                    Sign Up
                </button>
            </form>
        </div>
    </main>
  )
}
