const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const config = {
  user: 'Toor69',
  password: 'RootToToor321',
  server: 'serwere.database.windows.net',
  database: 'ParserowaBaza',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

// Specific CORS configuration for your frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    await sql.connect(config);

    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    const user = result.recordset[0];

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (passwordMatch) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql.connect(config);

    // Check if the email already exists
    const checkEmailQuery = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    const existingUser = checkEmailQuery.recordset[0];

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Email does not exist, proceed with registration
    const result = await sql.query`INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`;

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});
