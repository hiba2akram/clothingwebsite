// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ProductsDetail1.css";

// import img1 from "../assets/images/twopiece1.webp";
// import img2 from "../assets/images/twopiece2.webp";
// import img3 from "../assets/images/twopiece3.webp";
// import img4 from "../assets/images/twopiece4.webp";
// import img5 from "../assets/images/unstitched.webp";
// import img6 from "../assets/images/onepiece6.webp";

// import img1hover from "../assets/images/img1hover.webp";
// import img2hover from "../assets/images/img2hover.JPG";
// import img3hover from "../assets/images/img3hover.webp";
// import img4hover from "../assets/images/img4hover.JPG";
// import img5hover from "../assets/images/unstitchedhover.webp";
// import img6hover from "../assets/images/6hover.webp";

// const products = [
//   { id: "f1", name: "Fitzo Printed Shirt", 
//     price: 2500, images: [img1, img1hover],
//      description: "Comfortable cotton shirt, perfect for summer.",
//     details: ["Soft lawn fabric", "Full sleeves", "Lightweight" , "2.5 metre Fabric","Color: Blue & Off White"] },
//   { id: "f2", name: "Fitzo Lawn Shirt", price: 2700, images: [img2, img2hover], description: "Elegant lawn shirt for formal occasions.", details: ["Premium lawn fabric", "Full sleeves", "Breathable" , "2.5 metre Fabric","Color: "] },
//   { id: "f3", name: "Fitzo Casual Shirt", price: 2300, images: [img3, img3hover], description: "Casual shirt for everyday wear.", details: ["Cotton fabric", "Slim fit", "Machine washable" , "2.5 metre Fabric"] },
//   { id: "f4", name: "Fitzo Formal Shirt", price: 3000, images: [img4, img4hover], description: "Formal shirt for professional settings.", details: ["Wool blend", "Tailored fit", "Ironing required" , "2.5 metre Fabric"] },
//   { id: "f5", name: "Fitzo Designer Shirt", price: 3500, images: [img5, img5hover], description: "Designer shirt with unique patterns.", details: ["Printed fabric", "Regular fit", "Hand wash only" , "2.5 metre Fabric"] },
//   { id: "f6", name: "Fitzo Premium Shirt", price: 4000, images: [img6, img6hover], description: "Premium quality shirt for discerning customers.", details: ["Luxury fabric", "Custom fit", "Dry clean only" , "2.5 metre Fabric"] }
// ];

// function ProductDetail1({ addToCart }) {
//   const { id } = useParams();
//     const navigate = useNavigate();
  
//     const product = products.find(p => p.id === id);
  
//     const [qty, setQty] = useState(1);
//     const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
//     // ✅ NEW STATES
//     const [selectedSize, setSelectedSize] = useState("M");
//     const [showSizeChart, setShowSizeChart] = useState(false);
  
//     if (!product) return <h2>Product not found</h2>;
  
//     const images = product.images || [];
  
//     const increaseQty = () => setQty(qty + 1);
//     const decreaseQty = () => {
//       if (qty > 1) setQty(qty - 1);
//     };
  
//     // ✅ UPDATED CART (includes size)
//     const handleAddToCart = () => {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
//       const existingIndex = cart.findIndex(
//         item => item.id === product.id && item.size === selectedSize
//       );
  
//       const productToAdd = {
//         ...product,
//         quantity: qty,
//         size: selectedSize
//       };
  
//       if (existingIndex >= 0) {
//         cart[existingIndex].quantity += qty;
//       } else {
//         cart.push(productToAdd);
//       }
  
//       localStorage.setItem("cart", JSON.stringify(cart));
//       alert("Added to cart!");
//       navigate("/cart");
//     };
  
//     const prevImage = () => {
//       setCurrentImgIndex(prev =>
//         prev === 0 ? images.length - 1 : prev - 1
//       );
//     };
  
//     const nextImage = () => {
//       setCurrentImgIndex(prev =>
//         prev === images.length - 1 ? 0 : prev + 1
//       );
//     };
  
//     return (
//       <div className="container mt-5">
//         <div className="row g-4">
  
//           {/* LEFT IMAGE */}
//           <div className="col-md-6 text-center position-relative">
//             {images.length > 1 && (
//               <button className="img-nav prev" onClick={prevImage}>&lt;</button>
//             )}
  
//             <img
//               src={images[currentImgIndex]}
//               alt={product.name}
//               className="product-main-image"
//             />
  
//             {images.length > 1 && (
//               <button className="img-nav next" onClick={nextImage}>&gt;</button>
//             )}
//           </div>
  
//           {/* RIGHT SIDE */}
//           <div className="col-md-6">
//             <h2>{product.name}</h2>
//             <h4 className="price">Rs. {product.price}</h4>
//             <p>{product.description}</p>
  
//             {/* DETAILS */}
//             <div className="product-details mb-3">
//               {product.details.map((item, index) => (
//                 <p key={index}>• {item}</p>
//               ))}
//             </div>
  
//             <div className="mb-3">
//               <h6>Select Size:</h6>
//               <div className="d-flex gap-2 flex-wrap">
//                 {["S", "M", "L", "XL", "XXL"].map(size => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`btn btn-sm ${
//                       selectedSize === size
//                         ? "btn-dark"
//                         : "btn-outline-dark"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
  
//               <button
//                 className="btn btn-link mt-2 p-0"
//                 onClick={() => setShowSizeChart(true)}
//               >
//                 View Size Chart
//               </button>
//             </div>
  
//             {/* QUANTITY */}
//             <div className="quantity-container">
//               <button className="qty-btn" onClick={decreaseQty}>−</button>
//               <span className="qty-value">{qty}</span>
//               <button className="qty-btn" onClick={increaseQty}>+</button>
//             </div>
  
//             {/* ADD TO CART */}
//             <button className="add-cart-btn mt-3" onClick={handleAddToCart}>
//               Add to Cart
//             </button>
  
//             {/* BACK */}
//             <button
//               className="btn btn-secondary mt-2"
//               onClick={() => navigate("/fabrics")}
//             >
//               ← Back
//             </button>
//           </div>
//         </div>
  
//         {/* ✅ SIZE CHART MODAL */}
//         {showSizeChart && (
//           <div className="size-modal-overlay" onClick={() => setShowSizeChart(false)}>
//             <div className="size-modal" onClick={(e) => e.stopPropagation()}>
//               <h4>Men Shalwar Kameez Size Chart</h4>
  
//               <table className="table table-bordered mt-3">
//                 <thead>
//                   <tr>
//                     <th>Size</th>
//                     <th>Chest</th>
//                     <th>Length</th>
//                     <th>Shoulder</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>S</td><td>38</td><td>40</td><td>16</td></tr>
//                   <tr><td>M</td><td>40</td><td>41</td><td>17</td></tr>
//                   <tr><td>L</td><td>42</td><td>42</td><td>18</td></tr>
//                   <tr><td>XL</td><td>44</td><td>43</td><td>19</td></tr>
//                   <tr><td>XXL</td><td>46</td><td>44</td><td>20</td></tr>
//                 </tbody>
//               </table>
  
//               <button
//                 className="btn btn-dark mt-2"
//                 onClick={() => setShowSizeChart(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// export default ProductDetail1;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail1.css";

import img1 from "../assets/images/twopiece1.webp";
import img2 from "../assets/images/twopiece2.webp";
import img3 from "../assets/images/twopiece3.webp";
import img4 from "../assets/images/twopiece4.webp";
import img5 from "../assets/images/unstitched.webp";
import img6 from "../assets/images/onepiece6.webp";

import img1hover from "../assets/images/img1hover.webp";
import img2hover from "../assets/images/img2hover.JPG";
import img3hover from "../assets/images/img3hover.webp";
import img4hover from "../assets/images/img4hover.JPG";
import img5hover from "../assets/images/unstitchedhover.webp";
import img6hover from "../assets/images/6hover.webp";

const products = [
  {
    id: "f1",
    name: "Fitzo Printed Shirt",
    price: 2500,
    images: [img1, img1hover],
    description: "Comfortable cotton shirt, perfect for summer.",
    details: ["Soft lawn fabric", "Full sleeves", "Lightweight", "2.5 metre Fabric", "Color: Blue & Off White"]
  },
  {
    id: "f2",
    name: "Fitzo Lawn Shirt",
    price: 2700,
    images: [img2, img2hover],
    description: "Elegant lawn shirt for formal occasions.",
    details: ["Premium lawn fabric", "Full sleeves", "Breathable", "2.5 metre Fabric"]
  },
  {
    id: "f3",
    name: "Fitzo Casual Shirt",
    price: 2300,
    images: [img3, img3hover],
    description: "Casual shirt for everyday wear.",
    details: ["Cotton fabric", "Slim fit", "Machine washable", "2.5 metre Fabric"]
  },
  {
    id: "f4",
    name: "Fitzo Formal Shirt",
    price: 3000,
    images: [img4, img4hover],
    description: "Formal shirt for professional settings.",
    details: ["Wool blend", "Tailored fit", "Ironing required", "2.5 metre Fabric"]
  },
  {
    id: "f5",
    name: "Fitzo Designer Shirt",
    price: 3500,
    images: [img5, img5hover],
    description: "Designer shirt with unique patterns.",
    details: ["Printed fabric", "Regular fit", "Hand wash only", "2.5 metre Fabric"]
  },
  {
    id: "f6",
    name: "Fitzo Premium Shirt",
    price: 4000,
    images: [img6, img6hover],
    description: "Premium quality shirt for discerning customers.",
    details: ["Luxury fabric", "Custom fit", "Dry clean only", "2.5 metre Fabric"]
  }
];

function ProductDetail1() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  const [qty, setQty] = useState(1);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showSizeChart, setShowSizeChart] = useState(false);

  // ✅ RESET WHEN PRODUCT CHANGES
  useEffect(() => {
    setQty(1);
    setCurrentImgIndex(0);
    setSelectedSize("M");
  }, [id]);

  if (!product) return <h2>Product not found</h2>;

  const images = product.images || [];

  const safeIndex = images.length
    ? currentImgIndex % images.length
    : 0;

  const increaseQty = () => setQty(qty + 1);

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  // ✅ CART LOGIC (with size)
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === selectedSize
    );

    const productToAdd = {
      ...product,
      quantity: qty,
      size: selectedSize
    };

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    navigate("/cart");
  };

  const prevImage = () => {
    setCurrentImgIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImgIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mt-5">
      <div className="row g-4">

        {/* LEFT IMAGE */}
        <div className="col-md-6 text-center position-relative">

          {images.length > 1 && (
            <button className="img-nav prev" onClick={prevImage}>
              &lt;
            </button>
          )}

          <img
            src={images[safeIndex]}
            alt={product.name}
            className="product-main-image"
          />

          {images.length > 1 && (
            <button className="img-nav next" onClick={nextImage}>
              &gt;
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="price">Rs. {product.price}</h4>
          <p>{product.description}</p>

          {/* DETAILS */}
          <div className="product-details mb-3">
            {product.details?.map((item, index) => (
              <p key={index}>• {item}</p>
            ))}
          </div>

          {/* SIZE SELECT */}
          {/* <div className="mb-3">
            <h6>Select Size:</h6>

            <div className="d-flex gap-2 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`btn btn-sm ${
                    selectedSize === size
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div> */}

            {/* <button
              className="btn btn-link mt-2 p-0"
              onClick={() => setShowSizeChart(true)}
            >
              View Size Chart
            </button>
          </div> */}

          {/* QUANTITY */}
          <div className="quantity-container">
            <button className="qty-btn" onClick={decreaseQty}>−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" onClick={increaseQty}>+</button>
          </div>

          {/* ADD TO CART */}
          <button className="add-cart-btn mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* BACK */}
          <button
            className="btn btn-secondary mt-2"
            onClick={() => navigate("/fabrics")}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div
          className="size-modal-overlay"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="size-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Product Size Chart</h4>

            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Length</th>
                  <th>Shoulder</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>S</td><td>38</td><td>40</td><td>16</td></tr>
                <tr><td>M</td><td>40</td><td>41</td><td>17</td></tr>
                <tr><td>L</td><td>42</td><td>42</td><td>18</td></tr>
                <tr><td>XL</td><td>44</td><td>43</td><td>19</td></tr>
                <tr><td>XXL</td><td>46</td><td>44</td><td>20</td></tr>
              </tbody>
            </table>

            <button
              className="btn btn-dark mt-2"
              onClick={() => setShowSizeChart(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail1;