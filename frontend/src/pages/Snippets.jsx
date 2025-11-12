import { useEffect, useState } from 'react'
import SnippetCard from '../components/SnippetCard'
import { Link } from 'react-router-dom'

export default function Snippets() {
  const [snippets , setSnippets] = useState([]);
  const [selectedID, setSelectedID] = useState(null)
  const URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
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
    loadSnippets()
  }, [URL])
  
  // useEffect(() => {
  //   loadSnippets();
  // },[])
  
  const filteredSnippets = selectedID ? snippets.filter(snippet => snippet.id === selectedID) : snippets
 
  return (
    <main className='relative'>
      {snippets.length>0 ? (
        <section>
          <div>
            <aside className='mt-5 h-full pl-12 w-70 pr-5 overflow-auto border-r border-zinc-600 fixed'>
              <div><h1 className='text-white text-3xl mt-2 border-b-2 pb-3 border-zinc-600'>Your Snippets</h1></div>
              <div className={`text-white hover:bg-purple-900 cursor-pointer p-3 mt-4 ${!selectedID ? 'bg-purple-900' : ''}`} onClick={() => setSelectedID(null)}>All</div>
              <ul>
                {snippets.map((snippet) => (
                  <li key={snippet.id} className={`text-white hover:bg-purple-900 cursor-pointer p-3 ${selectedID === snippet.id ? 'bg-purple-900' : ''}`} onClick={() => setSelectedID(snippet.id)}>{snippet.title}</li>
                ))}
              </ul>
            </aside>

            <div className='p-7 h-full ml-70'>
              <div className='gap-5'>
                {filteredSnippets.map((snippet) => (
                  <SnippetCard snippet={snippet} key={snippet.id}/>
                ))}  
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className='flex justify-center text-white flex-col pt-24 items-center'>
          <h1 className='text-3xl my-5'>You have not saved any snippets yet!</h1>
          <Link to="/add-snippet" className='bg-purple-900 px-5 py-3 rounded-xl hover:bg-purple-800 text-white cursor-pointer'>Add a snippet</Link>
        </div>
      )}
    </main>
  )
}
