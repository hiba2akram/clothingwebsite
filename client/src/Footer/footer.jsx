import React , { useState} from "react";
import './footer.css';
function Footer() {

const [email, setEmail] = useState("");
return(
    <>
<div className="footer-main">

<h2 className="footer-heading">Subscribe to our newsletter</h2>
<input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

    </div>
    </>
);
}
export default Footer;
