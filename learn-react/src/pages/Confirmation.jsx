import { useNavigate } from "react-router-dom";
import "./Confirmation.css";

export default function Confirmation({ lastOrder }) {
  const navigate = useNavigate();

  if (!lastOrder) return <p>Tidak ada pesanan terakhir.</p>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <h2>✅ Pesanan Berhasil!</h2>
        <p className="confirmation-message">
          Pesanan kamu telah kami terima dengan penuh cinta 💙<br />
          Kami akan segera memproses dan mengirimkannya ke alamat tujuan.
        </p>
        <p>👤 <strong>{lastOrder.nama}</strong></p>
        <p>💳 Metode: {lastOrder.metode}</p>
        <p>💰 Total: Rp {lastOrder.total.toLocaleString()}</p>
        <p>📅 Waktu: {new Date(lastOrder.tanggal).toLocaleString()}</p>

        <div className="confirmation-buttons">
          <button onClick={() => navigate("/products")}>🛍️ Belanja Lagi</button>
          <button onClick={() => navigate("/transactions")}>📑 Lihat Transaksi</button>
        </div>
      </div>
    </div>
  );
}
