

 

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
 
// /*Navbar*/
// import Navbar from "./components/Navbar";
 
// /*Carousel*/
// import CarouselComponent from "./Carousel/Carousel";
 
// /*Main page categories*/
// import BrandSection from "./Brandsection/Brandsection";
 
// /*Brand video*/
// import Brandvideo from "./BrandVideo/Brandvideo";
 
// /*Sections*/
// import FeaturedProducts from "./section/Featuredproducts";
 
// /*Unstitched*/
// import TwoPiece from "./unstitched/fabrics";
// import ProductDetail1 from "./Productdetails/ProductDetail1";
 
// /*RTW*/
// import RTW from "./RTW/rtw";
 
// /*Luxury*/
// import Luxury from "./Luxury/luxury";
// import LuxuryDetail from "./Luxury/luxurydetails";
 
// /*Footer*/
// import Footer from "./Footer/footer";
 
// /*Mens*/
// import MenDress from "./Men/MenDress";
// import MenDressDetails from "./Men/MenDressDetails";
 
// /*Kids*/
// import Kids from "./Kids/Kids";
// import KidsDetail from "./Kids/KidsDetail";
 


// /*Footwear*/
// import Footwear from "./Footwear/footwear";
// import ProductDetail from "./Footwear/ProductDetail";
 
// /*Cart*/
// import Cart from "./Footwear/Cart";

// /*Admin*/
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminProducts from "./pages/AdminProducts";
// import AdminUsers from "./pages/AdminUsers";
// import AdminPanel from "./components/AdminPanel";

// /*Login*/
// import Login from './pages/Login';
// import Signup from './pages/Signup'
// import MyOrders from "./Orders/MyOrders";

// /*services*/

// /*checkout*/
// import Checkout from "./checkout/checkout";
// import OrderSuccess from "./checkout/OrderSuccess";

 
// function ComingSoon({ page }) {
//   return (
//     <div style={{
//       minHeight: "60vh",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       fontFamily: "'Jost', sans-serif",
//       color: "#1a1a1a",
//       gap: "12px"
//     }}>
//       <h2 style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase" }}>
//         {page}
//       </h2>
//       <p style={{ color: "#9e8972", letterSpacing: "2px", fontSize: "13px", textTransform: "uppercase" }}>
//         Coming Soon
//       </p>
//     </div>
//   );
// }
 
// /* ─── App Wrapper (Router lives here) ─────────────── */
// function AppWrapper() {
//   const [products, setProducts] = useState([]);
 
//   useEffect(() => {
//     fetch("http://localhost:5000/product")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.log("Backend not running or unavailable:", err));
//   }, []);
 
//   return (
//     <Router>
//       <MainApp products={products} />
//     </Router>
//   );
// }
 
// /* ─── Main App (Routes live here) ─────────────────── */
// function MainApp({ products }) {
//   const location = useLocation();
 
//   return (
//     <>
//       <Navbar />
 
//       <Routes>
 
//         {/* HOME */}
//         <Route
//           path="/"
//           element={
//             <>
//               <CarouselComponent />
//               <BrandSection />
//               <Brandvideo />
//               <FeaturedProducts />
//             </>
//           }
//         />
 
//         {/* MEN */}
//         <Route path="/men" element={<MenDress />} />
//         <Route path="/men/:id" element={<MenDressDetails />} />
 
//         {/* FOOTWEAR */}
//         <Route path="/footwear" element={<Footwear />} />
//         <Route path="/footwear/:id" element={<ProductDetail />} />
 
//         {/* UNSTITCHED / FABRICS */}
//         <Route path="/fabrics" element={<TwoPiece />} />
//         <Route path="/fabrics/:id" element={<ProductDetail1 />} />
//         {/* alias so old /TwoPiece links still work */}
//         <Route path="/TwoPiece" element={<TwoPiece />} />
 
//         {/* RTW */}
//         <Route path="/rtw" element={<RTW />} />
 
//         {/* LUXURY — fixed: was /luxury, now matches navbar /Luxury */}
//         <Route path="/Luxury" element={<Luxury />} />
//         <Route path="/Luxury/:id" element={<LuxuryDetail />} />
 
//         {/* KIDS */}
//         <Route path="/Kids" element={<Kids />} />
//         <Route path="/Kids/:id" element={<KidsDetail />} />
 
//         {/* CART */}
//         <Route path="/cart" element={<Cart />} />

//         {/*checkout*/}
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/order-success" element={<OrderSuccess />} />

//         {/*My Orders*/}
//         <Route path="/myOrders" element={<MyOrders />} />

      
//         {/* FIX: was /admin/login — now also works as /admin-login */}
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin/login" element={<AdminLogin />} />

//         <Route path="/admin" element={
//           <AdminPanel>
//             <AdminDashboard />
//           </AdminPanel>
//         } />
//         <Route path="/admin/orders" element={
//           <AdminPanel>
//             <AdminOrders />
//           </AdminPanel>
//         } />
//         <Route path="/admin/products" element={
//           <AdminPanel>
//             <AdminProducts />
//           </AdminPanel>
//         } />
//         {/* FIX: was missing — now added */}
//         <Route path="/admin/users" element={
//           <AdminPanel>
//             <AdminUsers />
//           </AdminPanel>
//         } />


//         {/* NAVBAR LINKS — placeholder pages */}
//         <Route path="/new-arrivals" element={<ComingSoon page="New Arrivals" />} />
//         <Route path="/western" element={<ComingSoon page="Western" />} />
//         <Route path="/sale" element={<ComingSoon page="Sale" />} />
//         <Route path="/wishlist" element={<ComingSoon page="Wishlist" />} />
//         <Route path="/search" element={<ComingSoon page="Search Results" />} />


//         <Route path="/login" element={<Login />} />
// <Route path="/signup" element={<Signup />} />

 
//         {/* 404 FALLBACK */}
//         <Route path="*" element={<ComingSoon page="Page Not Found" />} />


 
//       </Routes>
 
//       <Footer />
//     </>
//   );
// }
 
// export default AppWrapper;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import CarouselComponent from "./Carousel/Carousel";

import BrandSection from "./Brandsection/Brandsection";

import Brandvideo from "./BrandVideo/Brandvideo";

import FeaturedProducts from "./section/Featuredproducts";

import TwoPiece from "./unstitched/fabrics";
import ProductDetail1 from "./Productdetails/ProductDetail1";

import RTW from "./RTW/rtw";
import RTWDetail from "./RTW/rtwdetails";

import Luxury from "./Luxury/luxury";
import LuxuryDetail from "./Luxury/luxurydetails";

import Footer from "./Footer/footer";


import MenDress from "./Men/MenDress";
import MenDressDetails from "./Men/MenDressDetails";

import Kids from "./Kids/Kids";
import KidsDetail from "./Kids/KidsDetail";

import Footwear from "./Footwear/footwear";
import ProductDetail from "./Footwear/ProductDetail";

import Cart from "./Footwear/Cart";

import Wishlist from "./Whishlist/Whishlist";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminPanel from "./components/AdminPanel"; 
import AdminAnalytics from "./pages/AdminAnalytics";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./Orders/MyOrders";

import Checkout from "./checkout/checkout";
import OrderSuccess from "./checkout/OrderSuccess";


function ComingSoon({ page }) {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Jost', sans-serif",
      color: "#1a1a1a",
      gap: "12px"
    }}>
      <h2 style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase" }}>
        {page}
      </h2>
      <p style={{ color: "#9e8972", letterSpacing: "2px", fontSize: "13px", textTransform: "uppercase" }}>
        Coming Soon
      </p>
    </div>
  );
}


const PUBLIC_PATHS = ["/admin", "/admin/login", "/admin-login"];

function isAdminPath(pathname) {
  return pathname.startsWith("/admin");
}


function AppWrapper() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/public/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Backend not running or unavailable:", err));
  }, []);

  return (
    <Router>
      <MainApp products={products} />
    </Router>
  );
}


function MainApp({ products }) {
  const location = useLocation();
  const adminPage = isAdminPath(location.pathname);

  return (
    <>
      {!adminPage && <Navbar />}

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

        <Route path="/men" element={<MenDress />} />
        <Route path="/men/:id" element={<MenDressDetails />} />

        <Route path="/footwear" element={<Footwear />} />
        <Route path="/footwear/:id" element={<ProductDetail />} />

        <Route path="/fabrics" element={<TwoPiece />} />
        <Route path="/fabrics/:id" element={<ProductDetail1 />} />
        <Route path="/TwoPiece" element={<TwoPiece />} />

        <Route path="/rtw" element={<RTW />} />
        <Route path="/rtw/:id" element={<RTWDetail />} />

        <Route path="/Luxury" element={<Luxury />} />
        <Route path="/Luxury/:id" element={<LuxuryDetail />} />

        <Route path="/Kids" element={<Kids />} />
        <Route path="/Kids/:id" element={<KidsDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/myOrders" element={<MyOrders />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

     
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-login"  element={<AdminLogin />} />

      
        <Route path="/admin" element={
          <AdminPanel>
            <AdminDashboard />
          </AdminPanel>
        } />

        <Route path="/admin/orders" element={
          <AdminPanel>
            <AdminOrders />
          </AdminPanel>
        } />

        <Route path="/admin/products" element={
          <AdminPanel>
            <AdminProducts />
          </AdminPanel>
        } />

        <Route path="/admin/users" element={
          <AdminPanel>
            <AdminUsers />
          </AdminPanel>
        } />

        <Route path="/admin/analytics" element={
          <AdminPanel>
            <AdminAnalytics />
          </AdminPanel>
        } />
        

        
        <Route path="/wishlist"     element={<Wishlist />} />
  
     

      </Routes>

      {!adminPage && <Footer />}
    </>
  );
}

export default AppWrapper;