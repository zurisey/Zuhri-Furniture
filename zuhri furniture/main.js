// ========================== VARIABLES ==========================
const items = document.querySelectorAll(".item");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load cart UI
updateCartUI();

// ========================== ITEM CLICK ==========================
items.forEach(item => {
    item.addEventListener("click", () => {
        // Highlight selected
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        // Ambil data produk
        const product = {
            name: item.dataset.name || "Product",
            price: parseInt(item.dataset.price) || 0,
            img: item.dataset.img || ""
        };

        addToCart(product);
    });
});

// ========================== ADD TO CART ==========================
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    alert(`${product.name} berhasil ditambahkan ke cart!`);
}

// ========================== UPDATE CART UI ==========================
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    if(!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <p>${item.name}</p>
            <p>Rp ${item.price.toLocaleString()}</p>
            <span class="remove-item" data-index="${index}">✕</span>
        `;
        cartItemsContainer.appendChild(div);
    });

    const cartTotalEl = document.getElementById('cart-total');
    if(cartTotalEl) cartTotalEl.textContent = `Rp ${total.toLocaleString()}`;

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        });
    });
}

// ========================== DARK MODE ==========================
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

if(localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}