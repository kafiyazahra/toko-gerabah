import { useNavigate } from "react-router-dom";
import "./Transactions.css";

export default function Transactions({ transactions }) {
  const navigate = useNavigate();

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h2>📑 Riwayat Transaksi</h2>
        <p className="subtitle">Semua pesananmu tersimpan rapi di sini 💙</p>
      </div>

      {transactions.length === 0 ? (
        <p className="empty">Belum ada transaksi yang tercatat.</p>
      ) : (
        <ul className="transactions-list">
          {transactions.map((t, i) => (
            <li key={i} className="transaction-card">
              <h4>🧾 Pesanan #{i + 1}</h4>
              <p>👤 Nama: <strong>{t.nama}</strong></p>
              <p>💳 Metode: {t.metode}</p>
              <p>💰 Total: Rp {t.total.toLocaleString()}</p>
              <p>📅 Waktu: {new Date(t.tanggal).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Tombol kembali ke produk */}
      <div className="transactions-footer">
        <button onClick={() => navigate("/products")} className="btn-back">
          🔙 Kembali ke Produk
        </button>
      </div>

      {/* Tombol logout kembali ke Welcome */}
      <div className="transactions-footer">
        <button onClick={() => navigate("/")} className="btn-logout">
          🚪 Logout & Kembali ke Welcome
        </button>
      </div>
    </div>
  );
}
