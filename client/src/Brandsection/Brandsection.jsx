import React, { useState } from "react";
import './Brandsection.css';
import card1 from "../assets/images/card1.jpg";
import card2 from "../assets/images/card2.jpg";
import card3 from "../assets/images/card3.jpg";




function Brandsection() {
 const [open, setOpen] = useState(false);
 
return (
<>
<div className="brand-section">
<div className="brand-left">
<h2 className="brand-title">Discover Your Style with Fitzo</h2>
<p className="brand-description">Explore our latest collection of trendy and comfortable clothing. From casual wear to activewear, we have everything you need to express your unique style.</p>
{/* <button className="shop-now-btn" onClick={()=>setOpen(true)}>Shop Now</button> */}
</div>

<div className="brand-cards">

  <div className="card">
    <img src={card1} className="card-img-top" alt="card1"/>
    <div className="card-body">
      <h5 className="card-title">Ready To Wear</h5>
      <p className="card-text">Description here</p>
    </div>
  </div>

  <div className="card">
    <img src={card2} className="card-img-top" alt="card2" style={{height : "507px"}}/>
    <div className="card-body">
      <h5 className="card-title">Unstitched</h5>
      <p className="card-text">Description here</p>
    </div>
  </div>

  <div className="card">
    <img src={card3} className="card-img-top" alt="card3" style={{height : "507px"}}/>
    <div className="card-body">
      <h5 className="card-title">Western Wear</h5>
      <p className="card-text">Description here</p>
    </div>
  </div>

</div>
</div>

</>
);
}

export default Brandsection;
