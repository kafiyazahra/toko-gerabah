const express = require("express");
console.log("🔥 SERVER.JS SIMPLE 🔥");
const cors = require("cors");
const pool = require("./db"); // pastikan db.js sudah benar

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// TEST ROOT
// =====================
app.get("/", (req, res) => {
  res.send("Backend jalan ✅");
});

// =====================
// GET ALL PRODUCTS
// =====================
app.get("/products", async (req, res) => {
  console.log("📦 /products DIPANGGIL");
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error ambil products:", err);
    res.status(500).json({ message: "Gagal ambil data products" });
  }
});

// =====================
// TAMBAH PRODUCT
// =====================
app.post("/products", async (req, res) => {
  const { nama, harga, stok, deskripsi } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (nama, harga, stok, deskripsi)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nama, harga, stok, deskripsi]
    );
    res.json({ message: "Produk berhasil ditambahkan", data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error tambah product:", err);
    res.status(500).json({ message: "Gagal tambah product" });
  }
});

// =====================
// LOGIN API SIMPLE
// =====================
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🔥 /auth/login DIPANGGIL", req.body);

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password] // langsung cocokkan plain password
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Username atau Password salah" });
    }

    const user = result.rows[0];

    res.json({
      message: "Login berhasil",
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// RUN SERVER
// =====================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});