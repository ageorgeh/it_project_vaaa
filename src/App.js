import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Login from "./Components/Login"
import MyBooks from "./Components/MyBooks"
import Friends from "./Components/Friends"


import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </>  
    
  )
}

export default App
