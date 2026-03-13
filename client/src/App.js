

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CarouselComponent from "./Carousel/Carousel";
import BrandSection from "./Brandsection/Brandsection";
import Brandvideo from "./BrandVideo/Brandvideo";
import OnePiece from "./unstitched/onepiece";
import ProductDetail1 from "./Productdetails/ProductDetail1";
import Footer from "./Footer/footer";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <CarouselComponent />
              <BrandSection />
              <Brandvideo />
            </>
          }
        />

        <Route path="/onepiece" element={<OnePiece />} />
          <Route path="/product/:id" element={<ProductDetail1 />} />


      </Routes>
        {/* <Footer /> */}
    </Router>
  );
}

export default App;