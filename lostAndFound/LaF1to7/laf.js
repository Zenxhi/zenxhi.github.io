// ============================================================
//  laf_items.js  —  Lost and Found item data and rendering
// ============================================================

const LAF_ITEMS = [
    { id: 'lf001', name: 'Black Umbrella', description: 'Found near the main entrance. Black foldable umbrella with a wooden handle.', finder: 'RandomUser123', image: null, category: 'Accessories' },
    { id: 'lf002', name: 'Student ID Card', description: 'Found at the cafeteria. Name visible on card. Please claim at the Student Affairs Office.', finder: 'Student Affairs Office', image: null, category: 'Documents' },
    { id: 'lf003', name: 'Blue Tumbler / Water Bottle', description: 'Found in Room 301. Blue stainless steel tumbler, no labels.', finder: 'RandomUser123', image: null, category: 'Accessories' },
    { id: 'lf004', name: 'Eyeglasses (Black Frame)', description: 'Found at the library. Black rectangular frame, prescription lenses.', finder: 'Student Affairs Office', image: null, category: 'Accessories' },
    { id: 'lf005', name: 'USB Flash Drive', description: 'Found plugged into a computer at the computer lab. 32GB, black casing.', finder: 'RandomUser123', image: null, category: 'Electronics' },
    { id: 'lf006', name: 'Notebook (Green Cover)', description: 'Found near the gym. Green spiral notebook with handwritten name on the cover.', finder: 'Student Affairs Office', image: null, category: 'Books' },
    { id: 'lf007', name: 'Charging Cable (USB-C)', description: 'Found at the study hall. White USB-C cable, braided.', finder: 'RandomUser123', image: null, category: 'Electronics' },
    { id: 'lf008', name: 'Coin Purse', description: 'Small brown leather coin purse. Found near the entrance gate.', finder: 'Student Affairs Office', image: null, category: 'Accessories' },
    { id: 'lf009', name: 'Calculator (Casio fx-991)', description: 'Found in the Math room. Casio scientific calculator.', finder: 'RandomUser123', image: null, category: 'Electronics' },
    { id: 'lf010', name: 'Lunch Box', description: 'Found at the canteen. Blue lunch box with a yellow clip.', finder: 'Student Affairs Office', image: null, category: 'Others' },
    { id: 'lf011', name: 'Phone Case (Clear)', description: 'Found at the hallway near Room 210. Clear silicone case, fits iPhone 13.', finder: 'RandomUser123', image: null, category: 'Accessories' },
    { id: 'lf012', name: 'House/Room Keys', description: 'Found at the parking lot. Keychain with 3 keys and a small lanyard.', finder: 'Student Affairs Office', image: null, category: 'Others' },
    { id: 'lf013', name: 'Ballpen Set', description: 'Found in the hallway. A set of 4 ballpens held by a rubber band.', finder: 'RandomUser123', image: null, category: 'Stationery' },
    { id: 'lf014', name: 'Wired Earphones', description: 'Found at a bench outside. White wired earphones, 3.5mm jack.', finder: 'Student Affairs Office', image: null, category: 'Electronics' },
    { id: 'lf015', name: 'Jacket (Gray, Medium)', description: 'Found draped on a chair in the library. Gray hoodie jacket, size M.', finder: 'RandomUser123', image: null, category: 'Clothing' },
    { id: 'lf016', name: 'Printed School Requirements', description: 'Found near the printing station. Multiple pages stapled together.', finder: 'Student Affairs Office', image: null, category: 'Documents' },
    { id: 'lf017', name: 'Wireless Mouse', description: 'Found at the computer lab. Black wireless mouse, no USB receiver with it.', finder: 'RandomUser123', image: null, category: 'Electronics' },
    { id: 'lf018', name: 'Pencil Case', description: 'Found at the canteen. Orange pencil case with stickers, has pens and highlighters inside.', finder: 'Student Affairs Office', image: null, category: 'Stationery' },
    { id: 'lf019', name: 'Tote Bag (White)', description: 'Found near the gym exit. Plain white tote bag, no items inside.', finder: 'RandomUser123', image: null, category: 'Accessories' },
    { id: 'lf020', name: 'ATM / School ID', description: 'Found at the bulletin board area. Please go to the Student Affairs Office to claim.', finder: 'Student Affairs Office', image: null, category: 'Documents' },
];

const CATEGORY_ICONS = {
    'Electronics': '💻',
    'Documents': '📄',
    'Accessories': '🎒',
    'Clothing': '👕',
    'Books': '📚',
    'Stationery': '✏️',
    'Others': '📦',
};

// Seeded pseudo-random shuffle so each day label shows consistent items
function seededShuffle(arr, seed) {
    let s = seed;
    function rand() {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    }
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// daysAgo: 0 = today, 1 = yesterday, ..., 7 = 1 week ago
function getItemsForDay(daysAgo) {
    // Use date-based seed: today's date minus daysAgo
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const shuffled = seededShuffle(LAF_ITEMS, seed);
    // Show 3–5 items per day
    const count = 3 + (seed % 3);
    return shuffled.slice(0, count);
}

function getDayLabel(daysAgo) {
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return '1 Day Ago';
    if (daysAgo === 7) return '1 Week Ago';
    return `${daysAgo} Days Ago`;
}

function renderLaFPage(daysAgo) {
    const items = getItemsForDay(daysAgo);
    const label = getDayLabel(daysAgo);
    const container = document.getElementById('laf-items-grid');
    const dayTitle = document.getElementById('laf-day-title');
    if (dayTitle) dayTitle.textContent = `Lost & Found — ${label}`;

    if (!container) return;
    container.innerHTML = '';

    items.forEach(function(item) {
        const icon = CATEGORY_ICONS[item.category] || '📦';
        const finderClass = item.finder === 'Student Affairs Office' ? 'finder-sao' : 'finder-user';
        const card = document.createElement('div');
        card.className = 'laf-card';
        card.innerHTML = `
            <div class="laf-card-icon">${icon}</div>
            <div class="laf-card-body">
                <div class="laf-card-category">${item.category}</div>
                <div class="laf-card-name">${item.name}</div>
                <div class="laf-card-desc">${item.description}</div>
                <div class="laf-card-footer">
                    <span class="laf-finder ${finderClass}">📌 ${item.finder}</span>
                    <button class="laf-retrieve-btn" onclick="handleRetrieve('${item.id}', '${item.name.replace(/'/g,"\\'")}', '${item.finder}')">Retrieve</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function handleRetrieve(id, name, finder) {
    const msg = finder === 'Student Affairs Office'
        ? `Please visit the Student Affairs Office to claim:\n"${name}"\n\nBring a valid ID for verification.`
        : `You've requested to retrieve:\n"${name}"\n\nThe finder (${finder}) will be notified. Please wait for a response.`;
    alert(msg);
}