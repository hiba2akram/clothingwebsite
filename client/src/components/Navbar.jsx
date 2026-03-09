import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {

const [open, setOpen] = useState(false);

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
<li><a href="/products">Products</a></li>
<li><a href="/about">About</a></li>
<li><a href="/cart">Cart</a></li>
</ul>

</div>

</>
);
}

export default Navbar;