const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'Sw3vO41a!liDHk',
    database: 'bakery-products',
    host: 'localhost',
    port: 5432,
})

module.exports = pool;