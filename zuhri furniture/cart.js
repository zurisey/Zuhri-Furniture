// ==== DATA PRODUK ====
const products = [
    { id: 1, name: "Produk A", price: 50000 },
    { id: 2, name: "Produk B", price: 75000 },
    { id: 3, name: "Produk C", price: 100000 }
];

// ==== LOAD CART ====
function loadCartPage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    let total = 0;

    if (!container) return;

    container.innerHTML = "";

    if(cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty :(</p>";
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            container.innerHTML += `
                <div class="cart-item" style="animation-delay:${0.2 + index*0.1}s">
                    <span>${item.name} — Rp ${item.price.toLocaleString()} x ${item.qty}</span>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">&times;</span>
                </div>
            `;
        });
    }

    const totalElement = document.getElementById("cart-total");
    if(totalElement) totalElement.innerText = "Rp " + total.toLocaleString();
}

// ==== REMOVE ITEM ====
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
}

// ==== ADD TO CART (untuk katalog) ====
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);
    let exist = cart.find(item => item.id === id);

    if(exist) { 
        exist.qty += 1; 
    } else { 
        cart.push({ id: product.id, name: product.name, price: product.price, qty:1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// ==== CLEAR CART ====
function clearCart() {
    if(confirm("Are you sure you want to clear the cart?")) {
        localStorage.removeItem("cart");
        loadCartPage();
    }
}

// ==== CHECKOUT PAGE ====
function loadCheckoutPage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("checkout-items");
    const totalContainer = document.getElementById("checkout-total");
    let total = 0;

    if(!container || !totalContainer) return;

    container.innerHTML = "";
    if(cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty :(</p>";
        totalContainer.innerText = "Total: Rp 0";
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        container.innerHTML += `
            <div class="checkout-item">
                <span>${item.name} x ${item.qty}</span>
                <span>Rp ${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });

    totalContainer.innerText = "Total: Rp " + total.toLocaleString();
}

// ==== SEND TO WHATSAPP ====
function sendToWhatsapp() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if(!name || !phone || !address) {
        alert("Please fill all fields!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const admin = "6281326108921";
    let text = `Halo kak, saya ingin memesan:%0A%0A`;

    cart.forEach(item => {
        text += `- ${item.name} x ${item.qty} = Rp ${item.price.toLocaleString()}%0A`;
    });

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    text += `%0ATotal: Rp ${total.toLocaleString()}%0A`;
    text += `%0ANama: ${name}%0ANo WA: ${phone}%0AAlamat: ${address}`;

    window.open(`https://wa.me/${admin}?text=${text}`);
}

// ==== AUTO LOCATION ====
function getLocation() {
    if(!navigator.geolocation) {
        alert("Location not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const addressInput = document.getElementById("address");
        if(addressInput) addressInput.value = `https://maps.google.com/?q=${lat},${lng}`;
    });
}

// ==== INITIAL LOAD ====
document.addEventListener("DOMContentLoaded", () => {
    loadCartPage();
    loadCheckoutPage();
});