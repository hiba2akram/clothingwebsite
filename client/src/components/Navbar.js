import React, { useState } from "react";
import './Navbar.css';
import { FaBars } from "react-icons/fa";

function Navbar() {

    const [open, setOpen] = useState(false);

    return (
        <>
        <nav className="navbar">

            <div className="burger" onClick={()=> setOpen(true)}>
                <FaBars size={24}/>
            </div>

            <h2 className="logo">Clothing Store</h2>

        </nav>

        <div className={`sidebar ${open ? "show" : ""}`}>

            <button className="close-btn" onClick={()=> setOpen(false)}>
                ✖
            </button>

            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/cart">Cart</a></li>
            </ul>

        </div>
        </>
    );
}

export default Navbar;