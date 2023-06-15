import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Registration from "./Components/Account/Registration";
import Login from "./Components/Account/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivateAccount from "./Components/Account/ActivateAccount";
import { UseUserContext } from "./ContextAoi/Context/UserContext";
import Header from "./Components/Layout/Header/Header";
import BottomHeader from "./Components/Layout/BottomHeader/BottomHeader";
import Allevents from "./Components/Home/Events/Allevents";
import Products from "./Components/Products/Products";
import Footer from "./Components/Layout/Footer/Footer";
import BestSelling from "./Components/Products/BestSelling";
import SingleProduct from "./Components/Products/singleProduct/SingleProduct";
import { ScrollToTop } from "react-router-scroll-to-top";

const App = () => {
  const { Authanticated, loadUser, user } = UseUserContext();
  const [showmenus, setShowMenu] = useState(false);
  const [showSearch, setSearch] = useState(false);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-right" theme="dark" />
      <Header
        showmenus={showmenus}
        setShowMenu={setShowMenu}
        showSearch={showSearch}
        setSearch={setSearch}
      />
      <BottomHeader
        showmenus={showmenus}
        setShowMenu={setShowMenu}
        showSearch={showSearch}
        setSearch={setSearch}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Events" element={<Allevents />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/bestSelling" element={<BestSelling />} />
        <Route exact path="/singleProduct/:id" element={<SingleProduct />} />
        <Route
          exact
          path="/activation/:activation_Token"
          element={<ActivateAccount />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
