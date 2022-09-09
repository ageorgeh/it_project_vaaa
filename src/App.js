import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Login from "./Components/Login"
import MyBooks from "./Components/MyBooks"
import Friends from "./Components/Friends"
import Edit from "./Components/Edit"


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
          <Route path="/edit" element={<Edit />} />
        </Routes>
    </>  
    
  )
}

export default App
