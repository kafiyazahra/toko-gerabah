import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors()); // ini penting
app.use(express.json());

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username=$1 AND password=$2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Login berhasil",
        user: result.rows[0],
      });
    } else {
      res.status(401).json({
        message: "Username atau password salah",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server berjalan di http://localhost:5000");
});