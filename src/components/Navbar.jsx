import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>🏺 Gerabah Nusantara</h2>
      <div className="nav-links">
        <Link to="/">👋 Welcome</Link>
        <Link to="/products">🛍 Produk</Link>
        <Link to="/cart">🛒 Keranjang ({cartCount})</Link>
        <Link to="/login">🔐 Login</Link>
        <Link to="/logout">🚪 Logout</Link>
      </div>
    </nav>
  );
}