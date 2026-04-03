import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";

import img1 from "../assets/kids/img1.webp";
import img2 from "../assets/kids/img2.webp";
import img3 from "../assets/kids/img3.webp";
import img4 from "../assets/kids/img4.webp";

function FeaturedProducts() {
  const navigate = useNavigate();

  const products = [
    { id: "f1", name: "Embroidered Suit", price: 2500, img: img1 },
    { id: "f2", name: "Silk Lehnga", price: 4000, img: img2 },
    { id: "f3", name: "Lawn Collection", price: 1800, img: img3 },
    { id: "f4", name: "Casual Wear", price: 1200, img: img4 },
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

  return (
    <div className="featured-section">
      <h2 className="featured-title"> Featured Products</h2>

      <div className="featured-container">
        {products.map(product => (
          <div className="featured-card" key={product.id}>
            
            <img src={product.img} alt={product.name} />

            <h4>{product.name}</h4>
            <p className="price">Rs. {product.price}</p>

            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;