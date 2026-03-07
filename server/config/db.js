// const express = require("express");
// const cors = require("cors");

// const app = express();   // 🔥 THIS LINE CREATES app

const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "d1c2b3a4",
  database: "clothingstore"
});

connection.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

module.exports = connection;