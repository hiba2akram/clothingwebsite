


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
/*Sidebar*/
import Navbar from "./components/Navbar";
/*Carousel*/
import CarouselComponent from "./Carousel/Carousel";

/*Mainapage ctaegories*/
import BrandSection from "./Brandsection/Brandsection";

/* Brandvideo */
import Brandvideo from "./BrandVideo/Brandvideo";

/*Sections*/
import FeaturedProducts from "./section/Featuredproducts";

import TwoPiece from "./unstitched/fabrics";
import ProductDetail1 from "./Productdetails/ProductDetail1";

/*footer*/
import Footer from "./Footer/footer";

/*Mens*/
import MenDress from "./Men/MenDress";
import MenDressDetails from "./Men/MenDressDetails";

/*Kids*/
import Kids from "./Kids/Kids";
import KidsDetail from "./Kids/KidsDetail";

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./components/AdminDashboard";
import Footwear from "./Footwear/footwear";
import ProductDetail from "./Footwear/ProductDetail";
import Cart from "./Footwear/Cart";
function AppWrapper() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();

  // Default colors
  let brandColor = "black";
  let iconColor = "black";

  // Home page → white navbar
  if (location.pathname === "/") {
    brandColor = "white";
    iconColor = "white";
  }

  return (
    <>
      <Navbar brandColor={brandColor} iconColor={iconColor} />
<Routes>

  <Route
    path="/"
    element={
      <>
        <CarouselComponent />
        <BrandSection />
        <Brandvideo />
        <FeaturedProducts />
      </>
      
    }

  />

  {/*Men*/}
  <Route path = "/men" element ={<MenDress/>}/>
  <Route path="/men/:id" element={<MenDressDetails />} />

  {/* FOOTWEAR */}
  <Route path="/footwear" element={<Footwear />} />
  <Route path="/footwear/:id" element={<ProductDetail />} />

  {/* FABRICS */}
  <Route path="/fabrics" element={<TwoPiece />} />
  <Route path="/fabrics/:id" element={<ProductDetail1 />} />

  {/* KIDS */}
  <Route path="/Kids" element={<Kids />} />
  <Route path="/Kids/:id" element={<KidsDetail />} />

  {/* CART */}
  <Route path="/cart" element={<Cart />} />

  {/* ADMIN */}
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/admin" element={<AdminPanel><AdminDashboard /></AdminPanel>} />

</Routes>
        <Footer/>



    </>
    
  );
}

export default AppWrapper;