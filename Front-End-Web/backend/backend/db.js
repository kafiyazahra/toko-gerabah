const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Toko_Gerabah",
  password: "postgres123",
  port: 5432,
});


pool.connect()
  .then(() => console.log("PostgreSQL CONNECTED ✅"))
  .catch(err => console.error("PostgreSQL ERROR ❌", err.message));
  
module.exports = pool;
