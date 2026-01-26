import Editor from '@monaco-editor/react'
import {Pencil, Trash} from 'lucide-react'

export default function SnippetCard({snippet}) {
  return (
    <div className="text-white rounded-xl border-t border-zinc-700 shadow-lg px-8 py-6 my-5 overflow-auto">
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="text-4xl font-extrabold inline-block mr-2">{snippet.title}</h2>
          <span className='text-zinc-500 mr-8'><i>{snippet.language}</i></span>
        </div>
        <div className='flex gap-2'>
          <button className='bg-stone-700 p-2 hover:bg-stone-600 rounded-md'><Pencil size={16}/></button>
          <button className='bg-red-600 p-2 hover:bg-red-500 rounded-md'><Trash size={16}/></button>
        </div>
      </div>
      <p className="text-zinc-400 mt-2">{snippet.description}</p>
      <Editor 
        width="72vw"
        height="100%"
        defaultLanguage="javascript" 
        defaultValue="// some comment"
        theme="vs-dark"
        value={snippet.code}
        language={snippet.language} 
        className='my-5 h-100'
        options={{domReadOnly: true, readOnly:true,  readOnlyMessage: { value: "" }}}
      />
    </div>
  )
}
