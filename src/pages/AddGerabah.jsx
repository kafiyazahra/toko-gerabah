import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddGerabah.css";

export default function AddGerabah({ products, setProducts }) {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID").format(n);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!nama || !deskripsi || !gambar) return;

    setLoading(true);

    const newProduct = {
      id: Date.now(),
      nama,
      harga,
      stok,
      deskripsi,
      gambar: preview,
    };

    setTimeout(() => {
      setProducts((prev) => [...prev, newProduct]);

      setNama("");
      setHarga(0);
      setStok(0);
      setDeskripsi("");
      setPreview(null);
      setGambar(null);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => navigate("/products"), 900);
    }, 600);
  };

  return (
    <div className="add-page">
      <div className="form-card">
        <h2>🏺 Tambah Koleksi Gerabah</h2>
        <p className="subtitle">
          Tambahkan produk baru ke toko gerabah Anda
        </p>

        {success && (
          <div className="toast">✅ Produk berhasil ditambahkan</div>
        )}

        {/* Upload */}
        <label className="upload-box">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <span>📷 Upload Gambar</span>
          )}
          <input type="file" accept="image/*" onChange={handleImage} hidden />
        </label>

        {/* Nama */}
        <input
          type="text"
          placeholder="📝 Nama produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        {/* Harga */}
        <div className="number-control">
          <button onClick={() => setHarga(Math.max(0, harga - 1000))}>−</button>
          <span>💰 Rp {formatRupiah(harga)}</span>
          <button onClick={() => setHarga(harga + 1000)}>+</button>
        </div>

        {/* Stok */}
        <div className="number-control">
          <button onClick={() => setStok(Math.max(0, stok - 1))}>−</button>
          <span>📦 {stok} pcs</span>
          <button onClick={() => setStok(stok + 1)}>+</button>
        </div>

        {/* SUMMARY (biar ga kosong + keliatan pro) */}
        <div className="summary-box">
          <p>Total Nilai Stok</p>
          <h3>Rp {formatRupiah(harga * stok)}</h3>
        </div>

        {/* Deskripsi */}
        <textarea
          placeholder="📄 Deskripsi produk..."
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />

        {/* Buttons */}
        <div className="form-buttons">
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "💾 Simpan"}
          </button>

          <button
            className="btn-cancel"
            onClick={() => navigate("/products")}
          >
            ❌ Batal
          </button>
        </div>
      </div>
    </div>
  );
}