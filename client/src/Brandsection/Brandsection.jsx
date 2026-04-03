// import React, { useEffect, useRef, useState } from "react";
// import "./Brandsection.css";
// import { useNavigate } from "react-router-dom";

// import womenImg from "../assets/images/img2hover.JPG";
// import menImg from "../assets/images/card2.webp";
// import kidsImg from "../assets/images/kids.webp";
// import accessoriesImg from "../assets/images/jewelleys.webp";
// import footwearImg from "../assets/images/footwear1.webp";

// function Brandsection() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: "Women", img: womenImg, path: "/fabrics" },
//     { name: "Men", img: menImg, path: "/men" },
//     { name: "Kids", img: kidsImg, path: "/kids" },
//     { name: "Accessories", img: accessoriesImg, path: "/accessories" },
//     { name: "Footwear", img: footwearImg, path: "/footwear" },
//   ];

//   return (
//     <div className="brand-section">

//       <div className="brand-left">
//         <h2 className="brand-title">Discover Your Style with Fitzo</h2>
//         <p className="brand-description">
//           Explore our latest collection of trendy and comfortable clothing.
//         </p>
//       </div>

//       <div className="category-section">
//         {categories.map((cat, index) => (
//           <div key={index} className="category-card">

//             <div className="category-img">
//               <img src={cat.img} alt={cat.name} />
//             </div>

//             <h3 className="category-name">{cat.name}</h3>

//             <p className="category-desc">
//               Explore {cat.name} collection
//             </p>

//             <button
//               className="category-btn"
//               onClick={() => navigate(cat.path)}
//             >
//               Shop Now
//             </button>

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Brandsection;

import React, { useEffect, useRef, useState } from "react";
import "./Brandsection.css";
import { useNavigate } from "react-router-dom";

import womenImg from "../assets/images/img2hover.JPG";
import menImg from "../assets/images/card2.webp";
import kidsImg from "../assets/images/kids.webp";
import accessoriesImg from "../assets/images/jewelleys.webp";
import footwearImg from "../assets/images/footwear1.webp";

function Brandsection() {
  const navigate = useNavigate();

  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const categories = [
    { name: "Women", img: womenImg, path: "/fabrics" },
    { name: "Men", img: menImg, path: "/men" },
    { name: "Kids", img: kidsImg, path: "/kids" },
    { name: "Accessories", img: accessoriesImg, path: "/accessories" },
    { name: "Footwear", img: footwearImg, path: "/footwear" },
  ];

  return (
    <div
      ref={sectionRef}
      className={`brand-section ${isVisible ? "show" : ""}`}
    >
      <div className="brand-left">
        <h2 className="brand-title">Discover Your Style with Fitzo</h2>
        <p className="brand-description">
          Explore our latest collection of trendy and comfortable clothing.
        </p>
      </div>

      <div className="category-section">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <div className="category-img">
              <img src={cat.img} alt={cat.name} />
            </div>

            <h3 className="category-name">{cat.name}</h3>

            <p className="category-desc">
              Explore {cat.name} collection
            </p>

            <button
              className="category-btn"
              onClick={() => navigate(cat.path)}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brandsection;