// Daftar produk
const products = [
  {id: 1, name: "Elegant compact sofa", price: 1200000, desc: "This elegant compact sofa is thoughtfully designed to provide exceptional comfort while maintaining a space-saving form. Upholstered with premium fabric and finished with refined craftsmanship, it brings a subtle touch of luxury and sophistication to any interior.", img: "1.png"},
  {id: 2, name: "Minimalist loveseat", price: 1700000, desc: "The minimalist loveseat blends sleek design with cozy seating. Its clean lines and durable upholstery create a modern aesthetic while ensuring comfort, perfect for smaller living spaces or contemporary interiors.", img: "2.png"},
  {id: 3, name: "Contemporary bed", price: 2300000, desc:"This contemporary bed combines modern design with practical comfort. Featuring a sturdy frame and high-quality finishing, it adds both elegance and functionality to your bedroom.", img: "3.png"},
  {id: 4, name: "Coffee table", price: 750000, desc:"A stylish coffee table crafted for both form and function. Its refined design and smooth surfaces make it an ideal centerpiece for your living room, perfect for relaxing moments or entertaining guests.", img: "4.png"},
  {id: 5, name: "Compact sofa", price: 1800000, desc:"This compact sofa delivers comfort without dominating your space. Its premium upholstery and modern lines provide a sophisticated yet practical addition to any living area.", img: "5.png"},
  {id: 6, name: "Bar stool", price: 950000, desc:"Elevate your kitchen or bar area with this elegant bar stool. Designed for comfort and durability, it combines minimalist design with functional seating for everyday use.", img: "6.png"},
  {id: 7, name: "Refined dining table", price: 3200000, desc:"This refined dining table offers a luxurious touch to your dining area. Its polished finish and elegant design make every meal feel special, while its sturdy construction ensures long-lasting use.", img: "7.png"},
  {id: 8, name: "Console table", price: 2400000, desc:"The console table is a versatile piece that enhances any hallway or living space. Its sophisticated design and fine craftsmanship provide both style and practical storage or display options.", img: "8.png"},
  {id: 9, name: "Elegant dresser", price: 550000, desc:"This elegant dresser combines practical storage with sleek design. Its high-quality finish and refined details make it a chic addition to any bedroom or dressing area.", img: "9.png"},
  {id: 10, name: "Woven rattan chair", price: 520000, desc:"The woven rattan chair brings natural charm and comfort to any room. Lightweight yet durable, it creates a cozy seating option with a touch of artisanal elegance.", img: "10.png"},
  {id: 11, name: "Storage dresser", price: 650000, desc:"This storage dresser offers functional organization with a clean, modern look. Its smart design and quality finish make it ideal for keeping spaces tidy while maintaining style.", img: "11.png"},
  {id: 12, name: "Centerpiece vase", price: 3400000, desc:"A stunning centerpiece vase designed to enhance any room’s decor. Its elegant shape and fine craftsmanship create a luxurious accent, perfect for fresh flowers or artistic displays.", img: "12.png"},
  {id: 13, name: "Cabinet drawer", price: 250000, desc:"This compact cabinet drawer offers practical storage in a stylish design. Its durable finish and minimalistic form make it a versatile addition to any room.", img: "13.png"},
  {id: 14, name: "Modern recliner sofa", price: 1500000, desc:"The modern recliner sofa combines comfort and contemporary style. Soft upholstery and smooth reclining functionality make it a perfect choice for relaxation in any living space.", img: "14.png"},
  {id: 15, name: "Floating sofa", price: 500000, desc:"This floating sofa is designed to maximize space and style. Lightweight yet durable, it provides a cozy seating solution with a modern, airy aesthetic.", img: "15.png"},
  {id: 16, name: "Rattan lounge sofa", price: 2000000, desc:"The rattan lounge sofa blends natural materials with comfortable design. Its woven texture and elegant frame create a relaxed yet sophisticated seating experience for any indoor or outdoor area.", img: "16.png"},
];

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

const product = products.find(p => p.id === productId);

if (product) {
    document.getElementById("product-img").src = product.img;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-desc").textContent = product.desc;
    document.getElementById("product-price").textContent = 
      "Rp " + product.price.toLocaleString();
}

function addCurrentToCart() {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(p => p.id === product.id);

    if (existing) existing.qty++;
    else cart.push({...product, qty: 1});

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
}
