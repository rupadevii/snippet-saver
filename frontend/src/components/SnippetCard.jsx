export default function SnippetCard(props) {
  
  return (
    <div className="text-white rounded-xl bg-zinc-800 shadow-lg p-5 h-100 w-100 overflow-auto">
      <h2 className="text-xl">{props.snippet.title}</h2>
      <p className="text-zinc-400"><small>{props.snippet.description}</small></p>
      <span><i>{props.snippet.language}</i></span>
      <div>
        <code>{props.snippet.code}</code>
      </div>
    </div>
  )
}
