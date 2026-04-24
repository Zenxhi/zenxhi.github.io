// ============================================================
//  products.js  —  Central product data store
//  All products are stored in localStorage under 'products'
//  so user-added items persist across pages.
// ============================================================

const DEFAULT_PRODUCTS = [
    {
        id: 'e001',
        category: 'electronics',
        name: 'MSI GL63 Gaming Laptop',
        price: 52999,
        description: 'Intel Core i7, 16GB RAM, 512GB SSD, GTX 1650 GPU. Perfect for gaming and heavy workloads.',
        seller: 'TechDeals PH',
        image: 'images/msi_laptop.avif',
        listed: true
    },
    {
        id: 'e002',
        category: 'electronics',
        name: 'Wireless Bluetooth Earbuds',
        price: 1299,
        description: 'True wireless earbuds with noise cancellation, 24hr battery life.',
        seller: 'GadgetHub',
        image: null,
        listed: true
    },
    {
        id: 'c001',
        category: 'clothing',
        name: 'Oversized Graphic Tee',
        price: 350,
        description: 'Comfortable cotton oversized tee. Available in sizes S–XL.',
        seller: 'StreetStyle Co.',
        image: null,
        listed: true
    },
    {
        id: 'c002',
        category: 'clothing',
        name: 'Jogger Pants',
        price: 580,
        description: 'Slim-fit joggers, breathable fabric, great for daily wear.',
        seller: 'UrbanWear',
        image: null,
        listed: true
    },
    {
        id: 'b001',
        category: 'books',
        name: 'Clean Code',
        price: 850,
        description: 'By Robert C. Martin. A handbook of agile software craftsmanship.',
        seller: 'BookNook',
        image: null,
        listed: true
    },
    {
        id: 'b002',
        category: 'books',
        name: 'The Pragmatic Programmer',
        price: 750,
        description: 'Classic programming guide — your journey to mastery.',
        seller: 'BookNook',
        image: null,
        listed: true
    },
    {
        id: 'a001',
        category: 'accessories',
        name: 'Leather Crossbody Bag',
        price: 1200,
        description: 'Genuine leather, multiple compartments, adjustable strap.',
        seller: 'StyleVault',
        image: null,
        listed: true
    },
    {
        id: 'a002',
        category: 'accessories',
        name: 'Analog Wristwatch',
        price: 2500,
        description: 'Minimalist design, stainless steel case, water resistant.',
        seller: 'TimeKeeper',
        image: null,
        listed: true
    },
    {
        id: 'f001',
        category: 'food',
        name: 'Homemade Brownies (12pcs)',
        price: 280,
        description: 'Rich, fudgy chocolate brownies. Made fresh daily.',
        seller: 'Sweet Corner',
        image: null,
        listed: true
    },
    {
        id: 'f002',
        category: 'food',
        name: 'Bottled Iced Coffee',
        price: 85,
        description: 'Cold brew coffee in 250ml bottles. Lightly sweetened.',
        seller: 'BrewCo',
        image: null,
        listed: true
    },
    {
        id: 'eq001',
        category: 'equipment',
        name: 'Adjustable Dumbbell Set',
        price: 3500,
        description: '5–25kg adjustable dumbbells. Space-saving design.',
        seller: 'FitGear PH',
        image: null,
        listed: true
    },
    {
        id: 'eq002',
        category: 'equipment',
        name: 'Yoga Mat (6mm)',
        price: 650,
        description: 'Non-slip surface, eco-friendly material, includes carry strap.',
        seller: 'FitGear PH',
        image: null,
        listed: true
    }
];

// Initialize localStorage with defaults if empty
function initProducts() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
    }
}

function getProducts() {
    initProducts();
    return JSON.parse(localStorage.getItem('products'));
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function getProductsByCategory(category) {
    return getProducts().filter(p => p.category === category && p.listed);
}

function addProduct(product) {
    const products = getProducts();
    product.id = category.substring(0,2) + Date.now();
    product.listed = true;
    products.push(product);
    saveProducts(products);
}

function removeProduct(id, reason) {
    const products = getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
        products[idx].listed = false;
        products[idx].removeReason = reason;
        saveProducts(products);
    }
}

function getUserProducts() {
    const username = localStorage.getItem('username');
    if (!username) return [];
    return getProducts().filter(p => p.seller === username);
}