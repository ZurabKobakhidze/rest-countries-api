import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Country } from "components/pages/Country";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<Country />} /> 
      </Routes>
    </>
  );
}

export default App;
