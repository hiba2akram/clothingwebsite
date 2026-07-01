const bcrypt = require('bcryptjs');
const db = require('./config/db');

const updates = [
  { id: 1, password: 'pass123' },
  { id: 2, password: 'pass456' },
];

async function run() {
  for (const u of updates) {
    const hashed = await bcrypt.hash(u.password, 10);
    await db.promise().query(
      'UPDATE Users SET Password = ? WHERE UserID = ?',
      [hashed, u.id]
    );
    console.log(`Updated user ${u.id}`);
  }
  console.log('Done!');
  process.exit();
}

run();