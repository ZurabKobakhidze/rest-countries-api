import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Home } from "./components/pages/Home";



function App() {
  

  return (
    <>
     <Routes>
     <Route path="/" element={<Home />} />
     </Routes>
    </>
  )
}

export default App
