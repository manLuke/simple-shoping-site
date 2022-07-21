require("dotenv").config();
const fs = require("fs");
const Pool = require('pg').Pool;

const createTables = fs.readFileSync("./database.sql", "utf8");

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'db',
    port: 5432,
})

// check if tables exist (products, users), if not create them from database.sql
const checkDB = () => {
    pool.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.log(err);
            pool.query(createTables, (err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
};

module.exports = {
    pool,
    checkDB
}