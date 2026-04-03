// import React from "react";
// import { Link } from "react-router-dom";
// import { useParams, useNavigate } from "react-router-dom";

// import "./footwear.css";

// import f1 from "../assets/footwear/footwear1.webp";
// import hover1 from "../assets/footwear/footwear1(2).webp";
// import f2 from "../assets/footwear/footwear2.webp";
// import hover2 from "../assets/footwear/footwear2(1).webp";
// import f3 from "../assets/footwear/footwear3.webp";
// import hover3 from "../assets/footwear/footwear3(1).webp";
// import f4 from "../assets/footwear/footwear4.webp";
// import hover4 from "../assets/footwear/footwear4(1).webp";

// export const FootwearData = [
//   {
//     id: 1,
//     name: "Printed Khussa",
//     price: 2500,
//     oldPrice: 3000,
//     images: [f1, hover1],
//     description: "Elegant hand-stitched Khussa, perfect for formal and casual wear."
//   },
//   {
//     id: 2,
//     name: "Classic Khussa",
//     price: 2700,
//     oldPrice: 3200,
//     images: [f2, hover2],
//     description: "Traditional design with premium leather, comfortable and stylish."
//   },
//   {
//     id: 3,
//     name: "Summer Flats",
//     price: 2600,
//     oldPrice: 3100,
//     images: [f3, hover3],
//     description: "Lightweight flats ideal for daily summer outings."
//   },
//   {
//     id: 4,
//     name: "Elegant Heels",
//     price: 3000,
//     oldPrice: 3500,
//     images: [f4, hover4],
//     description: "Chic heels for parties and formal occasions."
//   }
// ];

// function Footwear() {
//     const navigate = useNavigate();
  

//     const handleAddToCart = (product) => {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const existingProduct = cart.find(item => item.id === product.id);

//   if (existingProduct) {
//     existingProduct.quantity += 1;
//   } else {
//     cart.push({ ...product, quantity: 1 });
//   }
//   localStorage.setItem("cart", JSON.stringify(cart));
//   navigate("/cart");
// };
//   const handleQuickView = (product, e) => {
//     e.preventDefault();
//     alert(product.description);
//   };

//  return (
//   <div className="container mt-3">
//     <h1 className="heading text-center mb-4">Footwear Collection</h1>

//     <div className="row g-4">
//       {FootwearData.map((product) => (
//         <div className="col-md-6 col-sm-12" key={product.id}>
          
//           <div className="product-card">

            
//             <span className="badge bg-danger sale-badge">Sale</span>

//             <div className="wishlist">♡</div>

// <Link to={`/footwear/${product.id}`}>              <div className="img-container">
//                 <img src={product.images[0]} className="product-img main-img" />
//                 <img src={product.images[1]} className="product-img hover-img" />
//               </div>
//             </Link>

//             <div className="card-body text-center">
//               <h5 className="product-title">{product.name}</h5>

//               <div className="rating">⭐⭐⭐⭐☆</div>

//               <p className="price">
//                 <span className="new-price">Rs. {product.price}</span>
//                 <span className="old-price">Rs. {product.oldPrice}</span>
//               </p>

//               <button className="btn btn-dark w-100"
//               onClick={() => handleAddToCart(product)}
// >
//   Add to Cart
// </button>
             
//             </div>

//           </div>

//         </div>
//       ))}
//    </div>
//     </div>
//   );
// }

// export default Footwear;

import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./footwear.css";

import f1 from "../assets/footwear/footwear1.webp";
import hover1 from "../assets/footwear/footwear1(2).webp";
import f2 from "../assets/footwear/footwear2.webp";
import hover2 from "../assets/footwear/footwear2(1).webp";
import f3 from "../assets/footwear/footwear3.webp";
import hover3 from "../assets/footwear/footwear3(1).webp";
import f4 from "../assets/footwear/footwear4.webp";
import hover4 from "../assets/footwear/footwear4(1).webp";

/* ================= DATA ================= */
export const FootwearData = [
  {
    id: 1,
    name: "Printed Khussa",
    price: 2500,
    oldPrice: 3000,
    images: [f1, hover1],
    description: "Elegant hand-stitched Khussa, perfect for formal and casual wear."
  },
  {
    id: 2,
    name: "Classic Khussa",
    price: 2700,
    oldPrice: 3200,
    images: [f2, hover2],
    description: "Traditional design with premium leather, comfortable and stylish."
  },
  {
    id: 3,
    name: "Summer Flats",
    price: 2600,
    oldPrice: 3100,
    images: [f3, hover3],
    description: "Lightweight flats ideal for daily summer outings."
  },
  {
    id: 4,
    name: "Elegant Heels",
    price: 3000,
    oldPrice: 3500,
    images: [f4, hover4],
    description: "Chic heels for parties and formal occasions."
  }
];

/* ================= COMPONENT ================= */
function Footwear() {
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
  return (
    <div className="container mt-3">
      <h1 className="heading text-center mb-4">
        Footwear Collection
      </h1>

      <div className="row g-4">
        {FootwearData.map((product) => (
          <div className="col-md-6 col-sm-12" key={product.id}>

            <div className="product-card">

              {/* SALE BADGE */}
              <span className="badge1 bg-danger sale-badge">
                Sale
              </span>

              {/* WISHLIST */}
              <div className="wishlist">♡</div>

              {/* IMAGE LINK */}
              <Link to={`/footwear/${product.id}`}>
                <div className="img-container">
                  <img
                    src={product.images[0]}
                    className="product-img main-img"
                    alt={product.name}
                  />
                  <img
                    src={product.images[1]}
                    className="product-img hover-img"
                    alt={product.name}
                  />
                </div>
              </Link>

              {/* DETAILS */}
              <div className="card-body text-center">
                <h5 className="product-title">{product.name}</h5>

                <div className="rating">⭐⭐⭐⭐☆</div>

                <p className="price">
                  <span className="new-price">
                    Rs. {product.price}
                  </span>{" "}
                  <span className="old-price">
                    Rs. {product.oldPrice}
                  </span>
                </p>

                {/* ADD TO CART */}
                <button
                  className="btn btn-dark w-100"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                {/* QUICK VIEW */}
                <button
                  className="btn btn-outline-secondary w-100 mt-2"
                  onClick={(e) => handleQuickView(product, e)}
                >
                  Quick View
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Footwear;