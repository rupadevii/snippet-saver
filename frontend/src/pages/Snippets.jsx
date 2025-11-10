import React, { useEffect, useState } from 'react'
import SnippetCard from '../components/SnippetCard'
import { Link } from 'react-router-dom'

export default function Snippets() {
  const [snippets , setSnippets] = useState([]);
  const URL = import.meta.env.VITE_API_URL;

  const loadSnippets = async () => {
    try{
      const token = localStorage.getItem("token");
      const res = await fetch(`${URL}/snippets/`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      setSnippets(data)
    }
    catch(error){
      console.log('There was an error in displaying the snippets', error)
    }
  }
  
  useEffect(() => {
    loadSnippets();
  }, [])
  
  return (
    <main className='relative'>
      {snippets.length>0 ? (
        <section>
          <h1 className='text-white text-3xl mt-8 mx-8 border-b-2 pb-3 border-zinc-600'>Your Snippets</h1>
          <div className='grid grid-cols-5'>
            <aside className='col-span-1 mt-5 h-100vh pl-12 pr-5 overflow-auto sticky'>
              <ul>
                {snippets.map((snippet, index) => (
                  <li key={index} className='text-white hover:bg-purple-900 cursor-pointer p-3'>{snippet.title}</li>
                ))}
              </ul>
            </aside>

            <div className='p-7 col-span-4 h-full'>
              <div className='flex flex-wrap mt-7 gap-5'>
                {snippets.map((snippet, index) => (
                  <SnippetCard snippet={snippet} key={index}/>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className='flex justify-center text-white flex-col pt-24 items-center'>
          <h1 className='text-3xl my-5'>You have not saved any snippets yet!</h1>
          <button className='bg-purple-900 px-5 py-3 rounded-xl hover:bg-purple-800 text-white cursor-pointer'><Link to="/add-snippet">Add a snippet</Link></button>
        </div>
      )}
    </main>
  )
}
