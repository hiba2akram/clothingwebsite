import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

{/* <Link to="/onepiece">1 Piece</Link> */}


function Navbar() {
const [open, setOpen] = useState(false);

const [unstitchedOpen, setUnstitchedOpen] = useState(false);

const [rtwOpen, setRtwOpen] = useState(false);

return (
<>

<nav className="navbar-main">

<div className="nav-left">

<div className="burger" onClick={()=>setOpen(true)}>
☰
</div>

<h2 className="brand">Fitzo</h2>

</div>

<div className="nav-right">
<span className="icon">🛒</span>
<span className="icon">👤</span>
</div>

</nav>


{/* Sidebar */}

<div className={`sidebar ${open ? "show" : ""}`}>

<button className="close-btn" onClick={()=>setOpen(false)}>
 Fitzo ✖ 
</button>

<ul>
<li><a href="/">Home</a></li>

<li className = "menu-item">
    <div className = "menu-title" onClick={()=>setUnstitchedOpen(!unstitchedOpen)}
    >Unstitched
    <span className = {`arrow ${unstitchedOpen ? "rotate" : ""}`}></span>

</div>
    <div className={`submenu ${unstitchedOpen ? "open" : ""}`}>
    <Link to = "/onepiece">1 Piece</Link>
    <Link to = "/twopiece">2 Piece</Link>
    <Link to = "/threepiece">3 Piece</Link>
</div>
</li>

<li class = "menu-item">
<div className = "menu-title" onClick={()=>setRtwOpen(!rtwOpen)}
    >Ready to Wear
    <span className = {`arrow ${rtwOpen ? "rotate" : ""}`}></span>

</div>
    <div className={`submenu ${rtwOpen ? "open" : ""}`}>
    <a href = "/shirts">Shirts</a>
    <a href = "/trousers">Trousers</a>
    <a href = "/3piece">3 Piece</a>
</div>
</li>

<li><a href="/teens">Teens</a></li>
<li><a href="/foot">Footwear</a></li>
<li><a href="/accessories">Accessories</a></li>

</ul>

</div>

</>
);
}

export default Navbar;