
export default function SnippetCard(props) {
  
  return (
    <div className="text-white rounded-xl bg-zinc-700 p-5 h-100 w-100 overflow-auto">
      <h2 className="text-xl">{props.snippet.title}</h2>
      <p className="text-zinc-400"><small>{props.snippet.description}</small></p>
      <span><i>{props.snippet.language}</i></span>
      <p>{props.snippet.code}</p>
    </div>
  )
}
