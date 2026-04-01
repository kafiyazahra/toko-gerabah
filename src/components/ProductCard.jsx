export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.gambar} />
      <h3>{product.nama}</h3>
      <p>Rp {product.harga}</p>
      <p>Stok: {product.stok}</p>
      <button onClick={() => addToCart(product)}>
        + Keranjang
      </button>
    </div>
  );
}