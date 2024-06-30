import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Login } from "./pages/login"
import { Blog } from "./pages/blog"

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
