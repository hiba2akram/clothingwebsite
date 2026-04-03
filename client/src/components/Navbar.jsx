import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Navbar({ brandColor = "white", iconColor = "white" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // main sidebar
  const [activePanel, setActivePanel] = useState(""); // secondary panel
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      const updateCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  setCartCount(totalItems);
}; 
      updateCount(); // initial count

      // Listen for cart updates
      window.addEventListener("cartUpdated", updateCount);
      return () => window.removeEventListener("cartUpdated", updateCount);
    }, []);


  const panels = {


    Woman: [
      { name: "Ready To Wear", link: "/readytowear" },
      { name: "Unstitched", link: "/fabrics" },
      { name: "Luxury", link: "/Luxury" },
      { name: "Western", link: "/Western" },
    ],
  
  };

  return (
    <>
      <nav className="navbar-main">
        <div className="nav-left">
          <div
            className="burger"
            onClick={() => setSidebarOpen(true)}
            style={{ color: iconColor }}
          >
            ☰
          </div>
          <h2 className="brand" style={{ color: brandColor }}>Fitzo</h2>
        </div>

         <div className="nav-right">

  <span className="icon" onClick={() => navigate('/cart')}>
    <FaShoppingCart />
     {cartCount > 0 && (
          <span className="badge">{cartCount}</span>
        )}
    
  </span>

  <span className="icon" onClick={() => navigate('/account')}>
    <FaUser />
  </span>
</div>
      </nav>

      {/* Main Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✖ Close
        </button>

        <ul>
        {["Home","Woman", "Man", "Kids", "Footwear"].map((cat) => (
  <li key={cat}>
    <div
      className="menu-title"
     onClick={() => {
  if (cat === "Woman") {
    setActivePanel("Woman");   
    setSidebarOpen(true);     
  } 
  else {
    setActivePanel("");      
    setSidebarOpen(false);     

    if (cat === "Home") navigate("/");
    else if (cat === "Man") navigate("/Men");
    else if (cat === "Kids") navigate("/Kids");
    else if (cat === "Footwear") navigate("/Footwear");
  }
}}

    >
      {cat}
    </div>      

    </li>
))}
        </ul>
      </div>

      {/* Secondary Panel */}
      {activePanel && (
        <div className="sidebar show secondary-sidebar">
          <button className="close-btn" onClick={() => setActivePanel("")}>
            ✖ Back
          </button>
          <h3>{activePanel} Collection</h3>
          <ul>
            {panels[activePanel].map((item) => (
              <li key={item.name}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;