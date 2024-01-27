import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Like from "./pages/Like";
import AuthContext from './AuthContext';
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Protected from "./pages/Protected";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("ab");
  console.log(AuthContext.user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/like" element={<Like />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/product/:category/:id" element={<Product />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/" element={<Products />} />
        <Route path="/prod/" element={<Protected />} />
      </Routes>
    </Router>
  );
}

export default App;
