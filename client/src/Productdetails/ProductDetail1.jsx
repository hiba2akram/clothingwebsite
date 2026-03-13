import { useParams, Link } from "react-router-dom";
import { useState } from "react";

// Images
import img1 from "../assets/images/onepiece1.webp";
import img1hover from "../assets/images/1hover.webp";
import img2 from "../assets/images/onepiece2.webp";
import img2hover from "../assets/images/2hover.webp";
import img3 from "../assets/images/onepiece3.webp"; 
import img3hover from "../assets/images/3hover.webp";
import img4 from "../assets/images/onepiece4.webp"; 
import img4hover from "../assets/images/4hover.webp";
import img5 from "../assets/images/onepiece5.webp";
import img5hover from "../assets/images/5hover.webp";
import img6 from "../assets/images/onepiece6.webp";
import img6hover from "../assets/images/6hover.webp";

const products = [
  { id: 1, name: "Fitzo Printed Shirt", 
    price: 2500, images: [img1, img1hover],
     description: "Comfortable cotton shirt, perfect for summer.",
    details: ["Soft lawn fabric", "Full sleeves", "Lightweight" , "2.5 metre Fabric","Color: Blue & Off White"] },
  { id: 2, name: "Fitzo Lawn Shirt", price: 2700, images: [img2, img2hover], description: "Elegant lawn shirt for formal occasions.", details: ["Premium lawn fabric", "Full sleeves", "Breathable" , "2.5 metre Fabric","Color: "] },
  { id: 3, name: "Fitzo Casual Shirt", price: 2300, images: [img3, img3hover], description: "Casual shirt for everyday wear.", details: ["Cotton fabric", "Slim fit", "Machine washable" , "2.5 metre Fabric"] },
  { id: 4, name: "Fitzo Formal Shirt", price: 3000, images: [img4, img4hover], description: "Formal shirt for professional settings.", details: ["Wool blend", "Tailored fit", "Ironing required" , "2.5 metre Fabric"] },
  { id: 5, name: "Fitzo Designer Shirt", price: 3500, images: [img5, img5hover], description: "Designer shirt with unique patterns.", details: ["Printed fabric", "Regular fit", "Hand wash only" , "2.5 metre Fabric"] },
  { id: 6, name: "Fitzo Premium Shirt", price: 4000, images: [img6, img6hover], description: "Premium quality shirt for discerning customers.", details: ["Luxury fabric", "Custom fit", "Dry clean only" , "2.5 metre Fabric"] }
];

function ProductDetail1({ addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <h2>Product not found</h2>;

  const nextImage = () => {
    if (currentImage < product.images.length - 1) setCurrentImage(currentImage + 1);
  };
  const prevImage = () => {
    if (currentImage > 0) setCurrentImage(currentImage - 1);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="container mt-5">
      <Link to="/onepiece" className="mb-3 d-inline-block">← Back to Collection</Link>

      <div className="row mt-4 g-4">

        {/* Left Column: Image + Navigation */}
        <div className="col-md-6 text-center">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="img-fluid mb-3 product-main-image"
          />
          <div className="image-nav-buttons d-flex justify-content-center gap-2">
            <button className="btn btn-dark" onClick={prevImage}>-</button>
            <button className="btn btn-dark" onClick={nextImage}>+</button>
          </div>
        </div>

        {/* Right Column: Product Info + Quantity + Add to Cart */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4>Rs.{product.price}</h4>
          <p>{product.description}</p>
          <div className="product-details mb-3">
  {product.details.map((item, index) => (
    <p key={index} className="mb-1">• {item}</p>
  ))}
</div>

          <div className="quantity-selector d-flex align-items-center mb-3 gap-2">
            <button className="btn btn-dark" onClick={decreaseQuantity}>-</button>
            <span className="quantity-display">{quantity}</span>
            <button className="btn btn-dark" onClick={increaseQuantity}>+</button>
          </div>

          <button className="btn btn-dark btn-lg" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail1;