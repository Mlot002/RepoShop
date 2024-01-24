  import Home from "./pages/Home";
  import Product from "./pages/Product";
  import Register from "./pages/Register";
  import Login from "./pages/Login";
  import Cart from "./pages/Cart";
  import Like from "./pages/Like";

  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import Products from "./pages/Products";
  import Protected from "./pages/Protected";

  function App() {
    console.log("ab");
    const user = false;
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/like" element={<Like />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
           <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          ></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/products/:category" element={<Products />}></Route>
          <Route path="/products/" element={<Products />}></Route>
          <Route path="/prod/" element={<Protected />}></Route>
        </Routes>
      </Router>
    );
  }

  export default App;