import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CarouselComponent from "./Carousel/Carousel";

import Footer from "./Footer/footer";

function App() {

  const [products, setProducts] = useState([]); // ✅ plural name

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div >
      <Navbar />

     <CarouselComponent/>

     <Footer/>
     
     
    </div>
    
  );
}

export default App;