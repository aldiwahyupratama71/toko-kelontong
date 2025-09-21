const produk = [
  { id: 1, nama: "Minyak Goreng", harga: 25000 },
  { id: 2, nama: "Gula Pasir", harga: 12000 },
  { id: 3, nama: "Mie Instan", harga: 3000 },
  { id: 4, nama: "Sabun Mandi", harga: 7000 },
  { id: 5, nama: "Telur Ayam (1 kg)", harga: 23000 },
  { id: 6, nama: "Beras Medium (5 kg)", harga: 62000 },
  { id: 7, nama: "Teh Celup", harga: 5000 },
  { id: 8, nama: "Kopi Sachet", harga: 2000 },
  { id: 9, nama: "Susu Kental Manis", harga: 10000 }
];

const keranjang = [];
const riwayat = [];

function renderProduk() {
  const list = document.getElementById("produk-list");
  produk.forEach(item => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";
    div.innerHTML = `
      <h3 class="text-lg font-bold">${item.nama}</h3>
      <p class="text-green-700">Rp ${item.harga.toLocaleString()}</p>
      <button onclick="tambahKeKeranjang(${item.id})" class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Tambah</button>
    `;
    list.appendChild(div);
  });
}

function tambahKeKeranjang(id) {
  const item = produk.find(p => p.id === id);
  const existing = keranjang.find(k => k.id === id);
  if (existing) {
    existing.jumlah += 1;
  } else {
    keranjang.push({ ...item, jumlah: 1 });
  }
  renderKeranjang();
}

function renderKeranjang() {
  const list = document.getElementById("keranjang-list");
  const totalEl = document.getElementById("total");
  list.innerHTML = "";
  let total = 0;

  keranjang.forEach(item => {
    const li = document.createElement("li");
    const subtotal = item.harga * item.jumlah;
    li.textContent = `${item.nama} x${item.jumlah} - Rp ${subtotal.toLocaleString()}`;
    list.appendChild(li);
    total += subtotal;
  });

  totalEl.textContent = total.toLocaleString();
}

function checkout() {
  if (keranjang.length === 0) return alert("Keranjang masih kosong!");
  riwayat.push([...keranjang]);
  keranjang.length = 0;
  renderKeranjang();
  renderRiwayat();
  alert("Pembelian berhasil!");
}

function renderRiwayat() {
  const list = document.getElementById("riwayat-list");
  const totalRiwayatEl = document.getElementById("total-riwayat");
  list.innerHTML = "";
  let totalSemua = 0;

  riwayat.forEach((transaksi, i) => {
    const totalHarga = transaksi.reduce((sum, p) => sum + p.harga * (p.jumlah || 1), 0);
    totalSemua += totalHarga;
    const items = transaksi.map(p => `${p.nama} x${p.jumlah || 1}`).join(", ");
    const li = document.createElement("li");
    li.textContent = `Transaksi #${i + 1}: ${items} (Total: Rp ${totalHarga.toLocaleString()})`;
    list.appendChild(li);
  });

  totalRiwayatEl.textContent = totalSemua.toLocaleString();
}

renderProduk();
