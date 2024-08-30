const express = require('express');
const connection = require('./db');

const app = express();
const port = 3000;

// Endpoint untuk menghitung total produk dengan harga di atas 80.000
app.get('/api/total-products-above-80000', (req, res) => {
  const query = `
    SELECT COUNT(*) AS total_products
    FROM Produk
    WHERE harga_produk > 80000
  `;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
