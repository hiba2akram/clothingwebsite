const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend running");
});

// Product API
app.get("/product", (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// Start Server 🔥
app.listen(5000, () => {
    console.log("Server running on port 5000");
});