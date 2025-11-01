import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SnippetForm() {
  const [formData, setFormData] = useState({title: "", language: "", code: "", description: ""});
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  
  function handleChange(e){
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try{
      const res = await fetch(`${URL}/snippets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      await res.json()
      setFormData({title: "", language: "", code: "", description: ""});

      if(res.ok){
        setTimeout(() => {
          navigate('/snippets')
        }, 1500)
      }
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <main className='flex justify-center items-center pt-6'>
        <div className="rounded-3xl px-10 py-7 bg-stone-900 text-white shadow-2xl">
            <h2 className='text-3xl text-center mb-5'>Add a snippet</h2>
            <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <input 
                  name="title" 
                  type="text" 
                  placeholder="Enter title" 
                  className='m-3 p-3 w-100 border border-zinc-500 rounded-sm'
                  value={formData.title}
                  onChange={handleChange}
                  required/>
                <input 
                  name="language" 
                  type="text" 
                  placeholder="Enter language" 
                  className='m-3 p-3 w-100 border border-zinc-500 rounded-sm'
                  value={formData.language}
                  onChange={handleChange}/>
                <textarea 
                  name="code" 
                  rows="7" 
                  placeholder='Enter code' 
                  className='m-3 p-3 w-100 border border-zinc-500 rounded-sm'
                  value={formData.code}
                  onChange={handleChange}/>
                <textarea 
                  name="description" 
                  rows="2" 
                  placeholder='Enter description' 
                  className='m-3 p-3 w-100 border border-zinc-500 rounded-sm'
                  value={formData.description}
                  onChange={handleChange}/>
                <button type="submit" className='bg-purple-900 px-3 py-2 rounded-xl mt-2 cursor-pointer hover:bg-purple-800'>Add snippet</button>
            </form>
        </div>
    </main>
  )
}
