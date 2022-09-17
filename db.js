const Pool = require('pg').Pool;

const pool = new Pool ({
  user: "postgres",
  password: "Mamba0824",
  host: "localhost",
  port: 5432,
  database: "ipcs"
});

module.exports = pool;