import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {

    if (!username || !email || !password) {
      alert("Semua data harus diisi!");
      return;
    }

    const user = {
      username,
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Pendaftaran berhasil!");
    navigate("/login");
  };

  const handleGoogleLogin = async () => {

    const provider = new GoogleAuthProvider();

    // supaya selalu pilih akun dulu
    provider.setCustomParameters({
      prompt: "select_account"
    });

    try {

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      localStorage.setItem("googleUser", JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }));

      alert("Login Google berhasil!");

      navigate("/products");

    } catch (error) {
      console.log(error);
      alert("Login Google gagal");
    }
  };

  return (
    <div className="register-page">

      <div className="register-box">

        <div className="register-header">
          <span className="icon-gerabah">🏺</span>
          <span className="icon-lock">🔒</span>
        </div>

        <h2 className="register-title">Daftar ke Toko Gerabah</h2>

        <p className="register-subtitle">
          Silakan buat akun untuk melanjutkan
        </p>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-register" onClick={handleRegister}>
          🛒 Daftar Sekarang
        </button>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            className="google-icon"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
          />
          Login dengan Google
        </button>

        <p className="login-link">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#2563eb" }}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;