import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import From from "./components/Form/Form";
import "react-toastify/dist/ReactToastify.css";
import Formview from "./components/Formview/Formview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<From />}></Route>
        <Route path="/formview" element={<Formview />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
