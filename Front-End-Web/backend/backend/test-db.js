const pool = require("./db");

pool.query("SELECT current_database()")
  .then(res => {
    console.log("TEST DB CONNECTED ✅");
    console.log("DATABASE:", res.rows[0].current_database);
    process.exit(0);
  })
  .catch(err => {
    console.error("TEST DB ERROR ❌", err.message);
    process.exit(1);
  });
