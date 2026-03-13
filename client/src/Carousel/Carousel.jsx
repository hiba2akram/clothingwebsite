

import React from "react";
import banner1 from "../assets/images/banner1.webp";
import banner2 from "../assets/images/banner2.webp";
import banner3 from "../assets/images/banner3.webp";
import "./Carousel.css";
import Navbar from "../components/Navbar";

function CarouselComponent() {

return (
<>

<Navbar/>

<div id="carouselExampleFade"
className="carousel slide carousel-fade"
data-bs-ride="carousel">

<div className="carousel-inner">

<div className="carousel-item active">
<img src={banner1} className="d-block w-100 carousel-img" alt="banner"/>
</div>

<div className="carousel-item">
<img src={banner2} className="d-block w-100 carousel-img" alt="banner" style={{color:"black"}}/>
</div>

<div className="carousel-item">
<img src={banner3} className="d-block w-100 carousel-img" alt="banner"  />
</div>

</div>

<button className="carousel-control-prev"
data-bs-target="#carouselExampleFade"
data-bs-slide="prev">
<span className="carousel-control-prev-icon"></span>
</button>

<button className="carousel-control-next"
data-bs-target="#carouselExampleFade"
data-bs-slide="next">
<span className="carousel-control-next-icon"></span>
</button>

</div>

</>
);
}

export default CarouselComponent;