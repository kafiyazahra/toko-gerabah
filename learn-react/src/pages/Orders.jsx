import { useLocation, useNavigate } from "react-router-dom";

export default function Orders() {
  const nav = useNavigate();
  const { state } = useLocation();
  const orders = state || [];

  return (
    <div className="center">
      <h1>📦 Pesanan Saya</h1>

      {orders.map((o, i) => (
        <p key={i}>{o.nama} - Rp {o.harga}</p>
      ))}

      <p>Status: Diproses</p>

      <button onClick={() => nav("/")}>Selesai</button>
    </div>
  );
}