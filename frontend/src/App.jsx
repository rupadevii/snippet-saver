import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SnippetForm from "./pages/SnippetForm"

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/add-snippet" element={<SnippetForm/>}/>
      <Route path="/snippets" element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
