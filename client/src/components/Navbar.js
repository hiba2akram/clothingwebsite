
import React from "react";
import './Navbar.css';

function Navbar() {
    return (
        <nav className = "navbar">
            <h2 className = "logo">👕 Clothing Store</h2>

            <ul className = "nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/cart">Cart</a></li>
            </ul>
        </nav>
    );
}
export default Navbar;