import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Country from "./components/Country";
import Filter from "./components/Filter";

function App() {
  return (
    <>
      <Navbar />
      <Filter />
      <Country />
    </>
  );
}

export default App;
