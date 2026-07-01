import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const update = () => setUser(JSON.parse(localStorage.getItem("user")));
    window.addEventListener("userUpdated", update);
    return () => window.removeEventListener("userUpdated", update);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(saved.length);
    };
    updateWishlist();
    window.addEventListener("wishlistUpdated", updateWishlist);
    return () => window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Kids", path: "/Kids" },
    {
      label: "Women",
      path: "/TwoPiece",
      dropdown: [
        { label: "Luxury", path: "/luxury" },
        { label: "RTW", path: "/rtw" },
        { label: "Unstitched", path: "/TwoPiece" },
      ],
    },
    { label: "Men", path: "/Men" },
    { label: "RTW", path: "/rtw" },
    { label: "Footwear", path: "/Footwear", highlight: true },
    { label: "My Orders", path: "/myOrders" },
  ];

  return (
    <>
      <div className="announcement-bar">
        <p>Free shipping on orders over Rs. 5,000 &nbsp;|&nbsp; New Summer Collection is Live</p>
      </div>

      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">

          <div className="navbar__left">
            <button
              className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
            <div className="navbar__logo">
              <Link to="/">
                <span className="logo-text">Fitzo</span>
                <span className="logo-sub">STUDIO</span>
              </Link>
            </div>
          </div>

          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.path} className={link.dropdown ? "nav-item--has-dropdown" : ""}>
                <Link
                  to={link.path}
                  className={`navbar__link ${link.highlight ? "navbar__link--sale" : ""} ${location.pathname === link.path ? "navbar__link--active" : ""}`}
                >
                  {link.label}
                  {link.dropdown && <span className="dropdown-arrow">▾</span>}
                </Link>
                {link.dropdown && (
                  <ul className="nav-dropdown">
                    {link.dropdown.map((item) => (
                      <li key={item.path}>
                        <Link to={item.path} className="nav-dropdown__link">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar__icons">
            <span className="nav-divider" />

            {user ? (
              <div className="nav-user">
                <div className="nav-user__avatar">{user.fName?.[0]?.toUpperCase()}</div>
                <div className="nav-user__info">
                  <span className="nav-user__greeting">Hello</span>
                  <span className="nav-user__name">{user.fName}</span>
                </div>
                <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="nav-auth-guest">
                <Link to="/login" className="nav-login-btn">Login</Link>
                <Link to="/signup" className="nav-register-btn">Sign up</Link>
              </div>
            )}

            <span className="nav-divider" />

            <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount > 9 ? "9+" : wishlistCount}</span>
              )}
            </Link>

            <Link to="/cart" className="nav-icon-btn" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount > 9 ? "9+" : cartCount}</span>
              )}
            </Link>
          </div>

        </div>
      </nav>

      <div
        className={`mobile-overlay ${menuOpen ? "mobile-overlay--open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
        <div className="mobile-drawer__logo">
          <span className="logo-text">Fitzo</span>
          <span className="logo-sub">STUDIO</span>
        </div>

        <ul className="mobile-drawer__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              {link.dropdown ? (
                <>
                  <div
                    className="mobile-link mobile-link--has-dropdown"
                    onClick={() => setOpenDropdown(openDropdown === link.path ? null : link.path)}
                  >
                    {link.label}
                    <span className="mobile-link__arrow">
                      {openDropdown === link.path ? "↓" : "→"}
                    </span>
                  </div>
                  {openDropdown === link.path && (
                    <ul className="mobile-subdropdown">
                      {link.dropdown.map((item) => (
                        <li key={item.path}>
                          <Link to={item.path} className="mobile-sublink">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`mobile-link ${link.highlight ? "mobile-link--sale" : ""}`}
                >
                  {link.label}
                  <span className="mobile-link__arrow">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-drawer__footer">
          {user ? (
            <div className="drawer-user">
              <div className="nav-user__avatar">{user.fName?.[0]?.toUpperCase()}</div>
              <span className="drawer-user__name">{user.fName}</span>
              <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="drawer-auth-guest">
              <Link to="/login" className="nav-login-btn">Login</Link>
              <Link to="/signup" className="nav-register-btn">Sign up</Link>
            </div>
          )}

          <Link to="/wishlist" className="mobile-cart-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Wishlist {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="mobile-cart-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;