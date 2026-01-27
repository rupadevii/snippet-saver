import React, {  useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { fetchAPI } from '../utils/api'

export default function DeleteSnippet({id, loadSnippets, closeModal}) {
    const token = useContext(AuthContext)
    
    async function deleteSnippet(){
        try{
            const data = await fetchAPI(`snippets/${id}`, "DELETE", {token})
            console.log(data)
            loadSnippets();
            closeModal()
        }
        catch(error){
            console.log(error)
        }
    }
    
    return (
    <div className='h-40 w-140 bg-stone-900 p-10'>
        <h2 className='text-white mb-3'>Do you really want to delete this snippet?</h2>
        <div>
            <button       
                className="bg-red-500 mx-auto px-3 py-2 rounded-xl mt-2 mr-3 cursor-pointer hover:bg-red-800"
                onClick={deleteSnippet}
            >
                Delete
            </button>
            <button
                className="bg-white text-black mx-auto px-3 py-1.5 rounded-xl mt-2 cursor-pointer hover:bg-gray-200"
                onClick={closeModal}>
                Cancel
            </button>
        </div>
    </div>
  )
}
