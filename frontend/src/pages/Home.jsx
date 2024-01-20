import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Categories />
      <ProductList />
      <Slider />
    </div>
  );
};

export default Home;
