import { Link, useNavigate } from "react-router-dom";
import "./Kids.css";

import img1 from "../assets/kids/img1.webp";
import img2 from "../assets/kids/img2.webp";
import img3 from "../assets/kids/img3.webp";
import img4 from "../assets/kids/img4.webp";
import img5 from "../assets/kids/img5.webp";
import img6 from "../assets/kids/img6.webp";

import img1hover from "../assets/kids/img1hover.jpg";
import img2hover from "../assets/kids/img3hover.jpg";
import img3hover from "../assets/kids/img4hover.webp";
import img4hover from "../assets/kids/img2hover.webp";
import img5hover from "../assets/kids/img5hover.webp";
import img6hover from "../assets/kids/img6hover.webp";

function Kids() {
  const navigate = useNavigate();
const products = [
  { id: "k1", name: "2 piece Embroidered Cotton net Suit", price: 500, description: "Comfortable cotton t-shirt for kids.", img: img1,img2: img1hover },
  { id: "k2", name: "Raw silk lehnga", price: 800, description: "Stylish denim jeans for kids.", img: img2 ,img2: img2hover},
  { id: "k3", name: "3 piece Embroidered Dobby Lawn suit", price: 1200, description: "Warm and cozy hoodie for kids.", img: img3,img2: img3hover },
  { id: "k4", name: "2 piece embroidered suit", price: 1500, description: "Cute and colorful dress for kids.", img: img4,img2: img4hover },
    { id: "k5", name: "3 piece embroidered suit", price: 2000, description: "Fun and playful romper for kids.", img: img5,img2: img5hover },
    { id: "k6", name: "2 piece embroidered organza suit", price: 2500, description: "Durable and stylish jacket for kids.", img: img6,img2: img6hover },
];

 const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleQuickView = (product) => {
    alert(product.description || "No description available");
  };
   return (
    <>

    <button className="btn btn-outline-secondary back-btn mb-4" onClick={(Carousel) => navigate(-1)}>
      ← Back
    </button>
      <h1 className="heading">Two Piece Collection</h1>

      <div className="container">
        <select className="form-select w-25 mb-4">
          <option>Sort by</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>

      
      {/* PRODUCTS */}
      <div className="container">
        <div className="row g-4">
          {products.map(product => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={product.id}>
              <div className="card product-card">
{/* 
                <span className="badge bg-danger sale-badge">Sale</span>

                <div className="wishlist" onClick={() => alert("Added to wishlist ❤️")}>
                  ❤️
                </div> */}

                <Link to={`/Kids/${product.id}`}>
                  <div className="img-container">
                    <img src={product.img} className="product-img main-img" alt={product.name} />
                    <img src={product.img2} className="product-img hover-img" alt={product.name} />
                  </div>
                 </Link> 

                <div className="card-body text-center">
                  <h5>{product.name}</h5>

                  <div className="rating">⭐⭐⭐⭐☆</div>

                  <p className="price">
                    <span className="new-price">Rs.{product.price}</span>
                    <span className="old-price">Rs.{product.oldPrice}</span>
                  </p>

                  <button
                    className="btn btn-dark w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  {/* QUICK VIEW */}
                  <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => handleQuickView(product)}
                  >
                    Quick View
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Kids;
