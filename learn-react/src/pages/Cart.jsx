import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const nav = useNavigate();
  const { state } = useLocation();
  const cart = state || [];

  const total = cart.reduce((a, b) => a + b.harga, 0);

  return (
    <div className="center">
      <h1>🛒 Keranjang</h1>

      {cart.map((item, i) => (
        <p key={i}>{item.nama} - Rp {item.harga}</p>
      ))}

      <h3>Total: Rp {total}</h3>

      <button onClick={() => nav("/orders", { state: cart })}>
        Checkout
      </button>

      <button onClick={() => nav("/products")}>
        Kembali
      </button>
    </div>
  );
}