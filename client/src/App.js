import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CarouselComponent from "./Carousel/Carousel";

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
     
     
    </div>
    
  );
}

export default App;