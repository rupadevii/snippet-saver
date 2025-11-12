import Editor from '@monaco-editor/react'
export default function SnippetCard(props) {
  
  return (
    <div className="text-white rounded-xl border-t border-zinc-700 shadow-lg px-8 py-6 my-5 overflow-auto">
      <div className='flex justify-between items-center'>
        <h2 className="text-4xl font-extrabold inline-block mr-2">{props.snippet.title}</h2>
        <span className='text-zinc-500 mr-8'><i>{props.snippet.language}</i></span>
      </div>
      <p className="text-zinc-400 mt-2">{props.snippet.description}</p>
      <Editor 
        width="72vw"
        defaultLanguage="javascript" 
        defaultValue="// some comment"
        theme="vs-dark"
        value={props.snippet.code}
        language={props.snippet.language} 
        className='my-5 h-100'
        options={{domReadOnly: true, readOnly:true,  readOnlyMessage: { value: "" }}}
      />
    </div>
  )
}
