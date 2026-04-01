import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <h1 className="title">✨ Selamat Datang ✨</h1>
      <p className="subtitle">di <span className="brand">Toko Gerabah Nusantara</span></p>

      <div className="card">
        <div className="icon">🏺</div>

        <h3 className="premium">Toko Gerabah Online Premium</h3>

        <div className="highlight">
          🛎️ Temukan berbagai produk gerabah berkualitas tinggi hasil karya pengrajin lokal Nusantara.  
          Dirancang dengan sentuhan tradisional dan kualitas modern untuk mempercantik rumah, dapur, maupun koleksi seni Anda.
        </div>

        <p className="shopping-text">
          🛒 Selamat Berbelanja & Temukan Produk Favorit Anda
        </p>

        <button className="btn-enter" onClick={() => navigate("/Register")}>
          🔐 Masuk Sekarang
        </button>
      </div>
    </div>
  );
}
