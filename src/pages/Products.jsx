import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Products.css";

export default function Products({ cart, setCart, products, setProducts }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* ========================
     ADD TO CART
  ======================== */
  const addToCart = (product) => {
    if (product.stok > 0) {
      setCart([...cart, product]);

      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, stok: p.stok - 1 } : p
        )
      );
    }
  };

  /* ========================
     DELETE
  ======================== */
  const deleteProduct = (id) => {
    if (window.confirm("Hapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  /* ========================
     EDIT
  ======================== */
  const editProduct = (p) => {
    const nama = prompt("Nama barang baru:", p.nama);
    if (!nama) return;

    const harga = prompt("Harga baru:", p.harga);
    if (!harga) return;

    const stok = prompt("Stok baru:", p.stok);
    if (!stok) return;

    setProducts(
      products.map((prod) =>
        prod.id === p.id ? { ...prod, nama, harga, stok } : prod
      )
    );
  };

  /* ========================
     CANCEL ORDER
  ======================== */
  const cancelOrder = () => {
    if (!window.confirm("Batalkan semua pesanan?")) return;

    const updatedProducts = [...products];

    cart.forEach((item) => {
      const index = updatedProducts.findIndex((p) => p.id === item.id);
      if (index !== -1) {
        updatedProducts[index].stok += 1;
      }
    });

    setProducts(updatedProducts);
    setCart([]);
  };

  /* ========================
     FILTER + SEARCH
  ======================== */
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.nama
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all"
        ? true
        : p.kategori?.toLowerCase() === filter.toLowerCase();

    return matchSearch && matchFilter;
  });

  const totalHarga = cart.reduce((sum, item) => sum + item.harga, 0);

  return (
    <div className="products-page">

      {/* BACK BUTTON */}
      <button
        className="btn-back"
        onClick={() => navigate("/")}
      >
        ←
      </button>

      {/* HEADER */}
      <div className="products-header">
        <h2>🏺 Produk Gerabah Nusantara</h2>

        <button
          className="btn-add-product"
          onClick={() => navigate("/add-gerabah")}
        >
          + Tambah Produk
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="tools">
        <input
          placeholder="🔍 Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="Vas">Vas</option>
          <option value="Guci">Guci</option>
          <option value="Pot">Pot</option>
          <option value="Cangkir">Cangkir</option>
          <option value="Piring">Piring</option>
          <option value="Mangkok">Mangkok</option>
          <option value="Lampu">Lampu</option>
          <option value="Hiasan">Hiasan</option>
        </select>
      </div>

      {/* GRID PRODUK */}
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>

            {p.stok === 0 && <span className="badge">Habis</span>}

            {/* EDIT & DELETE */}
            <div className="card-actions-top">
              <button
                className="btn-edit"
                onClick={() => editProduct(p)}
              >
                ✏
              </button>

              <button
                className="btn-delete"
                onClick={() => deleteProduct(p.id)}
              >
                🗑
              </button>
            </div>

            {/* GAMBAR */}
            <img src={p.gambar} alt={p.nama} className="product-img" />

            {/* INFO */}
            <div className="product-info">
              <h3>{p.nama}</h3>
              <p className="price">Rp {p.harga.toLocaleString()}</p>
              <p className="desc">{p.deskripsi}</p>
              <p className="stok">Stok: {p.stok}</p>
              <p className="kategori">Kategori: {p.kategori}</p>
            </div>

            {/* KERANJANG */}
            <button
              className="btn-cart"
              onClick={() => addToCart(p)}
            >
              🛒 Tambah ke Keranjang
            </button>

          </div>
        ))}
      </div>

      {/* CART */}
      <div className="cart-panel">
        <h3>🛒 Keranjang</h3>

        {cart.length === 0 ? (
          <p className="empty">Belum ada pesanan</p>
        ) : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                {item.nama} — Rp {item.harga.toLocaleString()}
              </li>
            ))}
          </ul>
        )}

        <p className="total">Total: Rp {totalHarga.toLocaleString()}</p>

        {cart.length > 0 && (
          <div className="cart-actions">
            <button
              className="btn-checkout"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>

            <button
              className="btn-cancel"
              onClick={cancelOrder}
            >
              Batal Pesanan
            </button>
          </div>
        )}
      </div>

    </div>
  );
}