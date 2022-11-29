import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Country from "./components/Country";
import SingleCountry from "./components/SingleCountry";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Country />} />
          <Route path="/country/:capital" element={<SingleCountry />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
