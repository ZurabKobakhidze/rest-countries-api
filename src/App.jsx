import { Country } from "pages/Country";
import { Home } from "pages/Home";
import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";


function App() {
    return (
      <DarkModeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Country />} />
        </Routes>
      </DarkModeProvider>
    );
  }

export default App;
