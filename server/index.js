require("dotenv").config();
const express = require('express');
const http = require('http');
// const fileUpload = require('express-fileupload');
// const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const pool = require('./db');
const { application } = require("express");


app.use(express.json()); // => req.body
app.use(cors());
// app.use(fileUpload());

// ROUTES

// get all products

app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// get one product
// not use yet, vuex does the job more efficiently

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const oneProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (oneProduct.rows[0] === undefined) {
      res.status(404).send('Product not found');
    } else {
      res.json(oneProduct.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// create a product

app.post('/api/products', async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newProduct = await pool.query("INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING *", [title, description, price]);
    console.log(req.body);
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// update a product

app.put('/api/products/:id', async (req, res) => {
  let updateProduct;
  const { id } = req.params;
  const argKey = Object.keys(req.body);
  try {
    console.log(argKey)
    if (argKey.length === 1) {
      const updateProduct = await pool.query(`UPDATE products SET ${argKey} = $1 WHERE id = $2 RETURNING *`, [req.body[argKey], id]);
      res.json(updateProduct.rows[0]);
    } else if (argKey.length === 2) {
      const updateProduct = await pool.query(`UPDATE products SET ${argKey[0]} = $1, ${argKey[1]} = $2 WHERE id = $3 RETURNING *`, [req.body[argKey[0]], req.body[argKey[1]], id]);
      res.json(updateProduct.rows[0]);
    } else if (argKey === 3) {
      const updateProduct = await pool.query(`UPDATE products SET ${argKey[0]} = $1, ${argKey[1]} = $2, ${argKey[2]} = $3 WHERE id = $4 RETURNING *`, [req.body[argKey[0]], req.body[argKey[1]], req.body[argKey[2]], id]);
      res.json(updateProduct.rows[0]);
    } else {
      res.status(400).send('Bad Request');
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Bad Request');
  }
})

// delete a product

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    // fs.unlinkSync(`${__dirname}/../client/public/assets/uploads/${productName.rows[0].title}.webp`);
    console.log("Deleting product...");
    console.log("Product was successfully deleted");
    res.json("Product was successfully deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// users
// register

app.post('/users/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const checkUser = await pool.query("SELECT * FROM users WHERE user_name = $1", [username]);
    if (checkUser.rows[0] === undefined) {
      const newUser = await pool.query("INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING user_name", [username, hash]);
      console.log(`User ${newUser.rows[0].user_name} has been registered`);
      res.status(200).send(`User ${newUser.rows[0].user_name} has been successfully registered`);
    } else if (checkUser.rows[0] !== undefined) {
      res.status(400).send('User already exists');
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

// login

app.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userLogin = await pool.query("SELECT * FROM users WHERE user_name = $1", [username]);
    if (userLogin.rows[0] === undefined) {
      res.status(404).send('User not found');
    } else if (userLogin.rows[0] !== undefined) {
      const isMatch = await bcrypt.compare(password, userLogin.rows[0].user_password);
      if (isMatch) {
        // res.status(200).send('Login successful');
        const accessToken = jwt.sign({ user: username }, process.env.ACCES_TOKEN_SECRET, { expiresIn: '2min' });
        res.status(201).json({ token: accessToken });
      } else if (!isMatch) {
        res.status(400).send('Password incorrect');
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

// check token
app.post('/users/checktoken', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    console.log(decoded);
    if (decoded.user) {
      res.status(200).json({"verification": "successful"});
    } 
  } catch (err) {
    console.error(err.message);
    if (err.message === "jwt expired") {
      res.status(403).json({"verification": "Přihlášení vypršelo"});
    } else if (err.message === 'invalid token' || err.message === 'invalid signature') {
      console.log("-----------------")
      console.warn("Invalid token");
      console.warn("Suspicious activity");
      console.log("-----------------")
      res.status(401).json({"verification": "Validní token"});
    } else {
      res.status(500).send('Server Error');
    }
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401)
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403)
    req.user = user
    next()
  })
}

// Experimental!!
// upload image

// app.post('/api/images', async (req, res) => {
//   let file = req.files.file;
//   try {
//     await console.log();
//     await file.mv(`${__dirname}/../client/public/assets/uploads/${file.name}`);
//     res.send(`${file.name} uploaded!`).status(200);
//     console.log(`${file.name} uploaded!`);
//   } catch (err) {
//     res.status(500).send(err);
//     console.log(err);
//   }
// })



app.listen(5000, '10.0.1.47', () => {
  console.log('Server is running on port 5000');
})