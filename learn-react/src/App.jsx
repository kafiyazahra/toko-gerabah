import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Transactions from "./pages/Transactions";
import AddGerabah from "./pages/AddGerabah"; // ✅ TAMBAH INI

// Import gambar produk
import asset1 from "./assets/1.jpg";
import asset2 from "./assets/2.jpg";
import asset3 from "./assets/3.jpg";
import asset4 from "./assets/4.jpg";
import asset5 from "./assets/5.jpg";
import asset6 from "./assets/6.jpg";
import asset7 from "./assets/7.jpg";
import asset8 from "./assets/8.jpg";
import asset9 from "./assets/9.jpg";
import asset10 from "./assets/10.jpg";

export default function App() {
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

 const [products, setProducts] = useState([
  { id: 1, nama: "Vas Gerabah", harga: 75000, stok: 12, kategori:"Vas", deskripsi: "Dibuat dari tanah liat pilihan, handmade, kuat dan estetik.", gambar: asset1 },
  { id: 2, nama: "Guci Tanah Liat", harga: 150000, stok: 5, kategori:"Guci", deskripsi: "Desain klasik nusantara, cocok untuk dekorasi rumah.", gambar: asset2 },
  { id: 3, nama: "Pot Bunga", harga: 50000, stok: 4, kategori:"Pot", deskripsi: "Ramah lingkungan, menjaga kelembaban tanah lebih lama.", gambar: asset3 },
  { id: 4, nama: "Cangkir Gerabah", harga: 30000, stok: 30, kategori:"Cangkir", deskripsi: "Nyaman digenggam, aman untuk minuman panas/dingin.", gambar: asset4 },
  { id: 5, nama: "Piring Gerabah", harga: 40000, stok: 18, kategori:"Piring", deskripsi: "Finishing halus, cocok untuk sajian tradisional maupun modern.", gambar: asset5 },
  { id: 6, nama: "Mangkok Tanah", harga: 45000, stok: 25, kategori:"Mangkok", deskripsi: "Kuat, tahan panas, tidak mudah retak.", gambar: asset6 },
  { id: 7, nama: "Tempat Air", harga: 120000, stok: 7, kategori:"Guci", deskripsi: "Menjaga air tetap sejuk secara alami.", gambar: asset7 },
  { id: 8, nama: "Asbak Gerabah", harga: 25000, stok: 40, kategori:"Hiasan", deskripsi: "Motif tradisional, kuat, mudah dibersihkan.", gambar: asset8 },
  { id: 9, nama: "Lampu Gerabah", harga: 180000, stok: 6, kategori:"Lampu", deskripsi: "Lampu hias bernuansa hangat dengan ukiran khas.", gambar: asset9 },
  { id: 10, nama: "Hiasan Dinding", harga: 90000, stok: 10, kategori:"Hiasan", deskripsi: "Bernilai seni tinggi, memperkuat karakter interior rumah.", gambar: asset10 }
]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        

        {/* PRODUK */}
        <Route
          path="/products"
          element={
            <Products
              cart={cart}
              setCart={setCart}
              products={products}
              setProducts={setProducts}
            />
          }
        />

        {/* ✅ TAMBAH PRODUK (BARU) */}
        <Route
          path="/add-gerabah"
          element={
            <AddGerabah
              products={products}
              setProducts={setProducts}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
              products={products}
              setProducts={setProducts}
              setTransactions={setTransactions}
              setLastOrder={setLastOrder}
            />
          }
        />

        <Route
          path="/confirmation"
          element={<Confirmation lastOrder={lastOrder} />}
        />

        <Route
          path="/transactions"
          element={<Transactions transactions={transactions} />}
        />
      </Routes>
    </BrowserRouter>
  );
}