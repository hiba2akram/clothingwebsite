const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'fitzo_secret_key'; 

exports.register = async (req, res) => {
  const { fName, lName, Email, Password, Phone } = req.body;
  try {
    
    const [existing] = await db.promise().query(
      'SELECT * FROM Users WHERE Email = ?', [Email]
    );
    if (existing.length > 0)
      return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(Password, 10);

    const [result] = await db.promise().query(
      'INSERT INTO Users (fName, lName, Email, Password, Phone, Role) VALUES (?,?,?,?,?,?)',
      [fName, lName, Email, hashed, Phone, 'Customer']
    );

    const token = jwt.sign(
      { UserID: result.insertId, Email, Role: 'Customer' },
      SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({ token, user: { UserID: result.insertId, fName, lName, Email, Role: 'Customer' } });
  }catch (err) {
  console.error("REGISTER ERROR:", err); 
  res.status(500).json({ message: 'Server error', error: err.message });
}
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM Users WHERE Email = ?', [email]
    );
    if (rows.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.Password);
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { UserID: user.UserID, Email: user.Email, Role: user.Role },
      SECRET,
      { expiresIn: '30d' }
    );

    res.json({ token, user: { UserID: user.UserID, fName: user.fName, lName: user.lName, Email: user.Email, Role: user.Role } });
  } catch (err) {
  console.error("LOGIN ERROR:", err);
  res.status(500).json({ message: 'Server error', error: err.message });
}
};

