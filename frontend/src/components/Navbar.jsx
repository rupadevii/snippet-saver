import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
 
  const token = localStorage.getItem("token")
  const isAbsent = location.pathname === "/" || location.pathname === "/register" || location.pathname === "/login";
  const addSnippet = location.pathname === "/add-snippet"

  if(isAbsent) return null;

  function handleLogOut(){
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/")
    }, 1500)
  }

  return (
    <header className='sticky top-0 z-10'>
        <nav className='py-5 px-30 flex text-white justify-between bg-purple-900'>
            <div>SnippetSaver</div>
            <div>
              {token ? (
                <ul className='flex gap-10'>
                  {addSnippet ? (
                    <li><Link to="/snippets">Snippets</Link></li>
                  ) : (
                    <li><Link to="/add-snippet">Add Snippet</Link></li>
                  )}
                  <li onClick={handleLogOut} className='cursor-pointer'>Logout</li>
                </ul>
              ) : (
                <ul className='flex gap-10'>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </ul>
              )}
            </div>
        </nav>
    </header>
  )
}
