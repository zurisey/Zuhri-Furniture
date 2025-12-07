// ==================== DAFTAR PRODUK ====================
const products = [
  {id: 1, name: "Elegant compact sofa", price: 1200000, img: "1.png"},
  {id: 2, name: "Minimalist loveseat", price: 1700000, img: "2.png"},
  {id: 3, name: "Contemporary bed", price: 2300000, img: "3.png"},
  {id: 4, name: "Coffee table", price: 750000, img: "4.png"},
  {id: 5, name: "Compact sofa", price: 1800000, img: "5.png"},
  {id: 6, name: "Bar stool", price: 950000, img: "6.png"},
  {id: 7, name: "Refined dining table", price: 3200000, img: "7.png"},
  {id: 8, name: "Console table", price: 2400000, img: "8.png"},
  {id: 9, name: "Elegant dresser", price: 550000, img: "9.png"}, 
  {id: 10, name: "Woven rattan chair", price: 520000, img: "10.png"}, 
  {id: 11, name: "Storage dresser", price: 650000, img: "11.png"}, 
  {id: 12, name: "Centerpiece vase", price: 3400000, img: "12.png"}, 
  {id: 13, name: "Cabinet drawer", price: 250000, img: "13.png"}, 
  {id: 14, name: "Modern recliner sofa", price: 1500000, img: "14.png"}, 
  {id: 15, name: "Floating sofa", price: 500000, img: "15.png"}, 
  {id: 16, name: "Rattan lounge sofa", price: 2000000, img: "16.png"},
];

// ==================== RENDER PRODUK ====================
function renderProducts() {
  const grid = document.getElementById('product-grid');
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Rp ${product.price.toLocaleString()}</p>
      </div>
      <button class="add-to-cart">Add to Cart</button>
    `;
    grid.appendChild(card);

    // Klik kartu → detail page
    card.addEventListener("click", e => {
      if (!e.target.classList.contains("add-to-cart")) {
        window.location.href = `detail.html?id=${product.id}`;
      }
    });

    // Add to cart
    card.querySelector(".add-to-cart").addEventListener("click", e => {
      e.stopPropagation();
      addToCart(product.id);
    });
  });
}

// ==================== FUNGSI ADD TO CART ====================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const exists = cart.find(p => p.id === id);
  if (exists) exists.qty++;
  else cart.push({...product, qty: 1});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} berhasil ditambahkan ke cart!`);
}

// ==================== DARK MODE PERMANEN ====================
document.body.classList.add("dark-mode");

// Jalankan render produk saat halaman siap
document.addEventListener("DOMContentLoaded", renderProducts);