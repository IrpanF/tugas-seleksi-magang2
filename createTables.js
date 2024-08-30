const connection = require('./db');

// Membuat tabel Kategori_Produk
const createKategoriProdukTable = `
CREATE TABLE IF NOT EXISTS Kategori_Produk (
    id_kategori_produk INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori_produk VARCHAR(100) NOT NULL
);
`;

// Membuat tabel Produk
const createProdukTable = `
CREATE TABLE IF NOT EXISTS Produk (
    id_produk INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(100) NOT NULL,
    stock INT NOT NULL,
    harga_produk DECIMAL(10, 2) NOT NULL,
    photo_produk VARCHAR(255) DEFAULT NULL,
    id_kategori_produk INT,
    FOREIGN KEY (id_kategori_produk) REFERENCES Kategori_Produk(id_kategori_produk)
);
`;

// Membuat tabel Transaksi
const createTransaksiTable = `
CREATE TABLE IF NOT EXISTS Transaksi (
    id_transaksi INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_produk INT NOT NULL,
    jenis_transaksi ENUM('masuk', 'keluar') NOT NULL,
    FOREIGN KEY (id_produk) REFERENCES Produk(id_produk)
);
`;

// Jalankan query untuk membuat tabel
connection.query(createKategoriProdukTable, (err, results, fields) => {
  if (err) throw err;
  console.log('Table Kategori_Produk created or already exists.');
});

connection.query(createProdukTable, (err, results, fields) => {
  if (err) throw err;
  console.log('Table Produk created or already exists.');
});

connection.query(createTransaksiTable, (err, results, fields) => {
  if (err) throw err;
  console.log('Table Transaksi created or already exists.');
});

// Menambahkan data ke tabel Kategori_Produk
const insertKategoriProduk = `
INSERT INTO Kategori_Produk (nama_kategori_produk) VALUES
('Elektronik'), ('Pakaian'), ('Makanan'), ('Peralatan Rumah Tangga');
`;

connection.query(insertKategoriProduk, (err, results, fields) => {
  if (err) throw err;
  console.log('Data inserted into Kategori_Produk.');
});

// Menambahkan data ke tabel Produk
const insertProduk = `
INSERT INTO Produk (nama_produk, stock, harga_produk, photo_produk, id_kategori_produk) VALUES
('Laptop', 50, 15000000.00, 'laptop.jpg', 1),
('Kaos Polos', 200, 50000.00, 'kaos_polos.jpg', 2),
('Roti Tawar', 100, 25000.00, 'roti_tawar.jpg', 3),
('Blender', 75, 300000.00, 'blender.jpg', 4);
`;

connection.query(insertProduk, (err, results, fields) => {
  if (err) throw err;
  console.log('Data inserted into Produk.');
});

// Menambahkan data ke tabel Transaksi
const insertTransaksi = `
INSERT INTO Transaksi (id_produk, jenis_transaksi) VALUES
(1, 'masuk'), (1, 'keluar'), (2, 'masuk'), (3, 'keluar'), (4, 'masuk');
`;

connection.query(insertTransaksi, (err, results, fields) => {
  if (err) throw err;
  console.log('Data inserted into Transaksi.');
});

// Tutup koneksi setelah semua operasi selesai
connection.end();
