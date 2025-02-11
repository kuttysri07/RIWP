import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Findyourmatch from "./Components/FindyourMatch/Findyourmatch";
import About from "./Components/About/About";
import Enquiry from "./Components/Enquiry/Enquiry";
import Contact from "./Components/Contact/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buyerpage from "./Components/Buyerpage/Buyerpage";
import Sellerpage from "./Components/Sellerpage/Sellerpage";
import From from "./Components/Form/Form";
import Sellerform from "./Components/Form/Sellerform";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Components/Product/Product";
import Property from "./Components/Product/Property";
import BuyerPage from "./Components/Buyer/BuyerPage";
import BuyerForm from "./Components/Form/BuyerForm";
import BuyerView from "./Components/Product/BuyerView";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 3000);
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Nav />
              <Home />
              <Findyourmatch />
              <About />
              <Enquiry />
              <Contact />
            </Fragment>
          }
        ></Route>
        <Route path="/newhouses" element={<BuyerPage />}></Route>
        <Route path="/properties" element={<Sellerpage />}></Route>
      
        <Route path="/form/newhouses" element={<BuyerForm />}></Route>
        <Route path="/form/properties" element={<Sellerform />}></Route>
        <Route path="newhouses/buyer/:id" element={<BuyerView />}></Route>
        <Route path="properties/property/:id" element={<Property />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
