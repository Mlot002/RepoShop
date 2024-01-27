const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors'); 

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
      console.log(user);


      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.Password);
  
        if (passwordMatch) {
         
          res.json({
            success: true,
            message: 'Login successful',
            user: {
              id: user.UserId.toString(),
              firstName: user.FirstName,
              lastName: user.LastName,
              email: user.Email,
             
            },
          });

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

  app.delete('/api/remove-favorite', async (req, res) => {
    try {
      const { favoriteId } = req.body;
  
      await sql.connect(config);
      await sql.query`DELETE FROM Favorites WHERE favorite_id = ${favoriteId}`;
      await sql.close();
  
      console.log(favoriteId);
  
      res.status(200).send('Product removed from wishlist');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error removing product from wishlist');
    }
  });
  
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql.connect(config);

    
    const checkEmailQuery = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    const existingUser = checkEmailQuery.recordset[0];

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    
    const result = await sql.query`INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`;

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});


app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, productId, category } = req.body;
    await sql.connect(config);

    const userResult = await sql.query`SELECT * FROM Users WHERE UserID = ${userId}`;
    const user = userResult.recordset[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log(userId);
    console.log(productId);
    console.log(category);

    await sql.query`INSERT INTO Favorites (UserId, product_id, category)
    SELECT ${userId}, ${productId}, ${category}
    WHERE NOT EXISTS (
        SELECT 1 FROM Favorites WHERE UserId = ${userId} AND product_id = ${productId} AND category = ${category}
    );`;

    res.json({
      success: true,
      message: 'Favorite added successfully',
      favorite: {
        userId: user.UserId.toString(),
        productId: productId,
        category: category
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const { userId } = req.query;
    await sql.connect(config);

    const userResult = await sql.query`SELECT * FROM Users WHERE UserID = ${userId}`;
    const user = userResult.recordset[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const favoritesResult = await sql.query`SELECT * FROM Favorites WHERE UserId = ${userId}`;
    const favorites = favoritesResult.recordset;

    res.json({
      success: true,
      message: 'Favorites retrieved successfully',
      favorites: favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
