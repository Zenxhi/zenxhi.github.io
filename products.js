// ============================================================
//  products.js  —  Central product data store
//  All products are stored in localStorage under 'products'
//  so user-added items persist across pages.
// ============================================================

const DEFAULT_PRODUCTS = [
    // Electronics
    {
        id: 'e001',
        category: 'electronics',
        name: 'MSI GL63 Gaming Laptop',
        price: 28000,
        description: 'Used for 1 year. Intel Core i7, 16GB RAM, 512GB SSD, GTX 1650. Minor scratches on the lid but fully functional. Comes with original charger.',
        seller: 'UserTest123',
        image: 'images/msi_laptop.avif',
        listed: true
    },
    {
        id: 'e002',
        category: 'electronics',
        name: 'Bluetooth Earbuds',
        price: 450,
        description: 'Used for 6 months. Works perfectly, good battery life. Selling because I got a new pair. Case included.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },

    // Clothing
    {
        id: 'c001',
        category: 'clothing',
        name: 'Oversized Graphic Tee',
        price: 120,
        description: 'Worn twice only. Washed and clean. Size L. No stains or damage.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },
    {
        id: 'c002',
        category: 'clothing',
        name: 'Jogger Pants',
        price: 200,
        description: 'Lightly used. Still in great condition. Size M. Selling because it no longer fits.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },

    // Books
    {
        id: 'b001',
        category: 'books',
        name: 'Clean Code',
        price: 300,
        description: 'Good condition. Some pencil annotations inside but readable. By Robert C. Martin.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },
    {
        id: 'b002',
        category: 'books',
        name: 'The Pragmatic Programmer',
        price: 280,
        description: 'Used but well-kept. No missing pages. Great read, selling because I already finished it.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },

    // Accessories
    {
        id: 'a001',
        category: 'accessories',
        name: 'Leather Crossbody Bag',
        price: 500,
        description: 'Used for a few months. Minor wear on the strap but still sturdy. Color: black.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },
    {
        id: 'a002',
        category: 'accessories',
        name: 'Analog Wristwatch',
        price: 800,
        description: 'Pre-owned. Still keeps accurate time. Small scratch on the glass. Selling because I switched to digital.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },

    // Food
    {
        id: 'f001',
        category: 'food',
        name: 'Homemade Brownies (12pcs)',
        price: 280,
        description: 'Freshly baked today. Rich and fudgy. Made with real chocolate. DM for orders.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },
    {
        id: 'f002',
        category: 'food',
        name: 'Bottled Iced Coffee (250ml)',
        price: 85,
        description: 'Homemade cold brew. Lightly sweetened. Made fresh every morning. Available daily.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },

    // Equipment
    {
        id: 'eq001',
        category: 'equipment',
        name: 'Adjustable Dumbbell Set',
        price: 1800,
        description: 'Used at home for 8 months. 5-25kg range. No rust or damage. Selling because I joined a gym.',
        seller: 'UserTest123',
        image: null,
        listed: true
    },
    {
        id: 'eq002',
        category: 'equipment',
        name: 'Yoga Mat (6mm)',
        price: 250,
        description: 'Used a handful of times. Clean, no tears. Comes with the carry strap.',
        seller: 'UserTest123',
        image: null,
        listed: true
    }
];

// Force reset so latest default data always loads fresh.
// Remove the line below when going to production.
localStorage.removeItem('products');

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
    return getProducts().filter(function(p) {
        return p.category === category && p.listed;
    });
}

function removeProduct(id, reason) {
    var products = getProducts();
    var idx = products.findIndex(function(p) { return p.id === id; });
    if (idx !== -1) {
        products[idx].listed = false;
        products[idx].removeReason = reason;
        saveProducts(products);
    }
}

function getUserProducts() {
    var username = localStorage.getItem('username');
    if (!username) return [];
    return getProducts().filter(function(p) { return p.seller === username; });
}
