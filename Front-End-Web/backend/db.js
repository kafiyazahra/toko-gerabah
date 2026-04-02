import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Toko_Gerabah",
  password: "postgresSQL",
  port: 5432
});

db.connect()
  .then(() => {
    console.log("Database berhasil konek");
  })
  .catch((err) => {
    console.log("Database gagal konek", err);
  });

export default db;