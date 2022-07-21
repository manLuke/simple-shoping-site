require("dotenv").config();
const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const pool = require('./db');
require('buffer');


app.use(express.json()); // => req.body
app.use(cors());
app.use(fileUpload());


// ROUTES

// get all products, that are is_visible

app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products WHERE is_visible = TRUE');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// get all products, only for admin
app.get('/api/admin/products', authenticateToken, async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// get image by id
app.get('/api/images/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const img_src = await pool.query('SELECT img_src FROM products WHERE id = $1', [id]);
    res.status(200).sendFile(`${__dirname}/assets/img/${img_src.rows[0].img_src}`);
  }
  catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
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

app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const { title, description, price, is_visible } = req.body;
    if (title === "" || price === "") {
      res.status(400).send('Missing parameters');
    } else {
      const checkTitle = await pool.query('SELECT title FROM products WHERE title = $1', [title]);
      if (checkTitle.rows[0] === undefined || checkTitle.rows[0] === null) {
        const newProduct = await pool.query("INSERT INTO products (title, description, price, is_visible) VALUES ($1, $2, $3, $4) RETURNING title", [title, description, price, is_visible]);
        res.status(201).send(`${newProduct.rows[0].title} - has been added`);
        console.log(`${newProduct.rows[0].title} has been added`);
      } else if (checkTitle.rows[0] !== undefined || checkTitle.rows[0] !== null) {
        res.status(400).send('Title already exists');
      }
    }
  } catch (err) {
    console.error(err.message);
  }
})

// update a product

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  let updateProduct;
  const { id } = req.params;
  const input = req.body;
  // catch parameters on which the database would throw errors
  await Object.keys(input).forEach(key => {
    if (input[key] === null || input[key] === "") {
      delete input[key];
    }
  });
  // ...and update the product
  const argKeys = Object.keys(input);
  try {
    if (argKeys.length === 1) {
      const updateProduct = await pool.query(`UPDATE products SET ${argKeys} = $1 WHERE id = $2 RETURNING *`, [req.body[argKeys], id]);
      res.send(updateProduct.rows[0].title + ' was updated');
      console.log(updateProduct.rows[0].title + ' - was updated');
    } else if (argKeys.length === 2) {
      const updateProduct = await pool.query(`UPDATE products SET ${argKeys[0]} = $1, ${argKeys[1]} = $2 WHERE id = $3 RETURNING *`, [req.body[argKeys[0]], req.body[argKeys[1]], id]);
      res.send(updateProduct.rows[0].title + ' was updated');
      console.log(updateProduct.rows[0].title + ' - was updated');
    } else if (argKeys === 3) {
      const updateProduct = await pool.query(`UPDATE products SET ${argKeys[0]} = $1, ${argKeys[1]} = $2, ${argKeys[2]} = $3 WHERE id = $4 RETURNING *`, [req.body[argKeys[0]], req.body[argKeys[1]], req.body[argKeys[2]], id]);
      res.send(updateProduct.rows[0].title + ' was updated');
      console.log(updateProduct.rows[0].title + ' - was updated');
    } else {
      res.status(400).send('Problem with parameters');
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Bad Request');
  }
})

// delete a product

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("DELETE FROM products WHERE id = $1 RETURNING img_src, title", [id]);
    fs.unlinkSync(`${__dirname}/assets/img/${product.rows[0].img_src}`);
    res.json(`${product.rows[0].title} was successfully deleted`);
    console.log(`${product.rows[0].title} - was deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})



// ==========================================================================================

// users


// register

app.post('/api/users/signup', async (req, res) => {
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

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userLogin = await pool.query("SELECT * FROM users WHERE user_name = $1", [username]);
    if (userLogin.rows[0] === undefined) {
      res.status(404).send('User not found');
    } else if (userLogin.rows[0] !== undefined) {
      const isMatch = await bcrypt.compare(password, userLogin.rows[0].user_password);
      if (isMatch) {
        // res.status(200).send('Login successful');
        const accessToken = jwt.sign({ user: username }, process.env.ACCES_TOKEN_SECRET, { expiresIn: '10min' });
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

// token verification

app.post('/api/users/checktoken', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    if (decoded.user) {
      res.status(200).json({"verification": "successful"});
    } 
  } catch (err) {
    if (err.message === "jwt expired") {
      res.status(403).json({"verification": "Login expired"});
    } else if (err.message === 'invalid token' || err.message === 'invalid signature') {
      console.log("-----------------")
      console.warn("Invalid token");
      console.warn("Suspicious activity");
      console.log("-----------------")
      res.status(401).json({"verification": "Invalid token"});
    } else {
      res.status(500).send('Server Error');
    }
  }
});

// user authentication before accessing actions (add products...)

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log("-----------------")
    console.warn("Missing token");
    console.warn("Suspicious activity");
    console.log("-----------------")
    return res.status(401).json("Missing token");
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Access denied');
    req.user = user
    next()
  })
}

// Experimental!!
// upload image

app.post('/api/images', authenticateToken, async (req, res) => {
  try {
    if (req.files) {
      const convert = (from, to) => str => Buffer.from(str, from).toString(to)
      let file = req.files.file;
      const hexToUtf8 = convert('hex', 'utf8')
      const nameArray = file.name.split(',');
      const fileName = hexToUtf8(nameArray)
      const productTitle = fileName.split('.')[0];
      const checkProduct = await pool.query('SELECT img_src FROM products WHERE title = $1', [productTitle]);
      if (checkProduct.rows[0].img_src === undefined || checkProduct.rows[0].img_src === null) {
      await file.mv(`${__dirname}/assets/img/${fileName}`);
      await pool.query("UPDATE products SET img_src = $1 WHERE title = $2", [fileName, productTitle]);
      res.status(200);
      console.log(`${fileName} - was uploaded`);
      } else if (checkProduct.rows[0].img_src !== undefined || checkProduct.rows[0].img_src !== null) {
        res.status(400);
      }
    } else {
      res.status(404).send('File not found');
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
})


app.listen(5000, () => {
  console.log('Server is running on port 5000');
})