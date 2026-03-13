import React from "react";
import "./onepiece.css";
import { Link } from "react-router-dom";


import img1 from "../assets/images/onepiece1.webp";
import img2 from "../assets/images/onepiece2.webp";
import img3 from "../assets/images/onepiece3.webp";
import img4 from "../assets/images/onepiece4.webp";
import img5 from "../assets/images/onepiece5.webp";
import img6 from "../assets/images/onepiece6.webp";


import img1hover from "../assets/images/1hover.webp";
import img2hover from "../assets/images/2hover.webp";
import img3hover from "../assets/images/3hover.webp";
import img4hover from "../assets/images/4hover.webp";
import img5hover from "../assets/images/5hover.webp";
import img6hover from "../assets/images/6hover.webp";



function OnePiece() {

  const products = [
    { id: 1, name: "Fitzo Printed Shirt", price: "Rs.2500", img1: img1, img2: img1hover },
    { id: 2, name: "Fitzo Lawn Shirt", price: "Rs.2700", img1: img2, img2: img2hover },
    { id: 3, name: "Fitzo Summer Shirt", price: "Rs.2600", img1: img3, img2: img3hover },
    { id: 4, name: "Fitzo Elegant Shirt", price: "Rs.2600", img1: img4, img2: img4hover },
    { id: 5, name: "Fitzo Casual Shirt", price: "Rs.2400", img1: img5, img2: img5hover },
    { id: 6, name: "Fitzo Formal Shirt", price: "Rs.2800", img1: img6, img2: img6hover }
  ];

  return (
    <>
      <h1 className="heading">One Piece Collection</h1>

      <div className="container mt-5">
        <div className="row g-4">

       {products.map(product => (
  <div className="col-md-4" key={product.id}>
    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
      <div className="card product-card">
        <div className="img-container">
          <img src={product.img1} className="product-img main-img" alt={product.name} />
          <img src={product.img2} className="product-img hover-img" alt={product.name} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="price">{product.price}</p>
        </div>
      </div>
    </Link>
  </div>
))}

        </div>
      </div>
    </>
  );
}

export default OnePiece;