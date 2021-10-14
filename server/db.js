const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "secretpassword",
    host: "localhost",
    port: 5432,
    database: "petshop",
});

module.exports = pool;
