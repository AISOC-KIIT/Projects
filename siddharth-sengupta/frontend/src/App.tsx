import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Login } from "./pages/login"
import { Blog } from "./pages/blog"
import { HomeBlogs } from "./pages/homeBlogs"
import NewBlog from "./pages/newBlog"
function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeBlogs/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/new-post" element={<NewBlog/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
