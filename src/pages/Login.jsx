import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ simpan user (bukan token)
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login berhasil");
        navigate("/products");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server tidak terhubung");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <span className="icon-gerabah">🏺</span>
          <span className="icon-lock">🔐</span>
        </div>

        <h2 className="login-title">Masuk ke Toko Gerabah</h2>
        <p className="login-subtitle">
          Silakan isi akun Anda untuk melanjutkan belanja
        </p>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-login" onClick={handleLogin}>
          🛒 Login Sekarang
        </button>
      </div>
    </div>
  );
}

export default Login;