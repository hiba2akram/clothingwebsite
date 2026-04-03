import { Link, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import "./fabrics.css";

import img1 from "../assets/images/twopiece1.webp";
import img2 from "../assets/images/twopiece2.webp";
import img3 from "../assets/images/twopiece3.webp";
import img4 from "../assets/images/twopiece4.webp";
import img5 from "../assets/images/unstitched.webp";
import img6 from "../assets/images/onepiece6.webp";
import festive from "../assets/images/festive.webp";
import west from "../assets/images/west.webp";
import rtw from "../assets/images/rtw.webp";
import unstitched from "../assets/images/unstitched.webp";




import img1hover from "../assets/images/img1hover.webp";
import img2hover from "../assets/images/img2hover.JPG";
import img3hover from "../assets/images/img3hover.webp";
import img4hover from "../assets/images/img4hover.JPG";
import img5hover from "../assets/images/unstitchedhover.webp";
import img6hover from "../assets/images/6hover.webp";

function TwoPiece() {
const products = [
  { id: "f1", name: "Fitzo Printed Shirt", price: 2500, oldPrice: 3000, description: "Printed lawn shirt", img: img1, img2: img1hover },
  { id: "f2", name: "Fitzo Lawn Shirt", price: 2700, oldPrice: 3200, description: "Lawn summer collection", img: img2, img2: img2hover },
  { id: "f3", name: "Fitzo Summer Shirt", price: 2600, oldPrice: 3100, description: "Light summer wear", img: img3, img2: img3hover },
  { id: "f4", name: "Fitzo Elegant Shirt", price: 2600, oldPrice: 3000, description: "Elegant stitched shirt", img: img4, img2: img4hover },
  { id: "f5", name: "Fitzo Casual Shirt", price: 2400, oldPrice: 2900, description: "Casual everyday wear", img: img5, img2: img5hover },
  { id: "f6", name: "Fitzo Formal Shirt", price: 2800, oldPrice: 3300, description: "Formal premium shirt", img: img6, img2: img6hover },
];

 const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  /* ✅ ADD TO CART */
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔥 notify navbar + cart
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/cart");
  };

  /* ✅ UPDATE COUNT */
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(totalItems);
    };

    updateCount();

    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  /* QUICK VIEW */
  const handleQuickView = (product, e) => {
    e.preventDefault();
    alert(product.description);
  };

  // const handleAddToCart = (product) => {
  //   let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  //   const existingProduct = cart.find(item => item.id === product.id);

  //   if (existingProduct) {
  //     existingProduct.quantity += 1;
  //   } else {
  //     cart.push({ ...product, quantity: 1 });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   navigate("/cart");
  // };

  // const handleQuickView = (product) => {
  //   alert(product.description || "No description available");
  // };

  return (
    <>
    
      <h1 className="heading">Two Piece Collection</h1>

      <div className="container">
        <select className="form-select w-25 mb-4">
          <option>Sort by</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>
<div className="category-sidebar">
  <div className="category-circle-row">

    <div className="category-circle" onClick={() => alert("Festive")}>
      <img src={festive} alt="Festive" />
      <p className="category-label">Festive</p>

    </div>


    <div className="category-circle" onClick={() => alert("Ready to Wear")}>
      <img src={west} alt="west" />
    </div>

    <div className="category-circle" onClick={() => alert("Luxury")}>
      <img src={rtw} alt="rtw" />
    </div>

    <div className="category-circle" onClick={() => alert("Western Wear")}>
      <img src={unstitched} alt="unstitched" />
    </div>

    

  </div>
</div>

     

      {/* PRODUCTS */}
      <div className="container">
        <div className="row g-4">
          {products.map(product => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={product.id}>
              <div className="card product-card">

                {/* <span className="badge1 bg-danger sale-badge">Sale</span>  */}

                 { <div className="wishlist" onClick={() => alert("Added to wishlist ❤️")}>
                  ❤️
                </div> }

                <Link to={`/fabrics/${product.id}`}>
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

export default TwoPiece;