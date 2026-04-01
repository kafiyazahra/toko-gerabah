import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Checkout.css";

export default function Checkout({
  cart,
  setCart,
  setTransactions,
  setLastOrder
}) {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pesan, setPesan] = useState("");
  const [metode, setMetode] = useState("Transfer Bank");
  const [voucher, setVoucher] = useState(0);

  // =====================
  // HITUNG TOTAL
  // =====================
  const totalHarga = cart.reduce((sum, item) => sum + item.harga, 0);
  const totalBayar = totalHarga - voucher;

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = () => {
    if (!nama || !alamat) {
      alert("Nama & alamat wajib diisi ya 😊");
      return;
    }

    const transaksiBaru = {
      nama,
      alamat,
      pesan,
      metode,
      total: totalBayar,
      tanggal: Date.now(),
      items: [...cart],
    };

    setTransactions((prev) => [...prev, transaksiBaru]);
    setLastOrder(transaksiBaru);
    setCart([]);

    navigate("/confirmation");
  };

  const handleCancel = () => navigate("/products");

  // =====================
  // UI
  // =====================
  return (
    <div className="checkout-page">

      {/* HEADER */}
      <div className="checkout-header">
        <h2 className="title-font">✨ Checkout Pesanan</h2>
        <p className="subtitle">
          {cart.length} produk di keranjang
        </p>
      </div>

      {/* LIST PRODUK */}
      <div className="checkout-list">
        {cart.map((item, i) => (
          <div className="checkout-item" key={i}>
            <img src={item.gambar} alt={item.nama} />

            <div className="item-info">
              <h4>{item.nama}</h4>
              <p>Rp {item.harga.toLocaleString()}</p>
              <small>Jumlah: 1</small>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="checkout-form">
        <label>Nama Lengkap</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama lengkap"
        />

        <label>Alamat</label>
        <input
          type="text"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Masukkan alamat pengiriman"
        />

        <label>Pesan (Opsional)</label>
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tambah catatan..."
        />
      </div>

      {/* OPSI */}
      <div className="checkout-options">
        <label>Metode Pembayaran</label>
        <select value={metode} onChange={(e) => setMetode(e.target.value)}>
          <option>Transfer Bank</option>
          <option>COD (Bayar di Tempat)</option>
          <option>E-Wallet</option>
        </select>

        <label>Voucher Diskon</label>
        <select
          value={voucher}
          onChange={(e) => setVoucher(Number(e.target.value))}
        >
          <option value={0}>Tidak ada</option>
          <option value={10000}>Diskon Rp10.000</option>
          <option value={20000}>Diskon Rp20.000</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="checkout-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>Rp {totalHarga.toLocaleString()}</span>
        </div>

        <div className="summary-row discount">
          <span>Diskon</span>
          <span>- Rp {voucher.toLocaleString()}</span>
        </div>

        <div className="summary-row">
          <span>Ongkir</span>
          <span>Gratis</span>
        </div>

        <hr />

        <p className="total">
          Total Bayar
          <span> Rp {totalBayar.toLocaleString()}</span>
        </p>

        <button className="btn-place-order" onClick={handleSubmit}>
          🚀 Buat Pesanan
        </button>

        <button className="btn-cancel-order" onClick={handleCancel}>
          ❌ Batalkan
        </button>
      </div>

    </div>
  );
}