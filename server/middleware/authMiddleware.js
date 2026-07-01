

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Please login to proceed" });
  }

  try {
    const token = authHeader.split(" ")[1];
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fitzo_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message); // 👈 Add this to debug
    return res.status(401).json({ message: "Please login to proceed" });
  }
};