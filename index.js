// ============================================================
//  index.js  —  Shared across all pages
// ============================================================

// ---------- Theme ----------
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
}

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
}

window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        if (e.newValue === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }
});

// ---------- Menu toggle ----------
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('overlay').classList.toggle('active');
    });
}
const overlay = document.getElementById('overlay');
if (overlay) {
    overlay.addEventListener('click', function () {
        document.getElementById('sidebar').classList.remove('active');
        overlay.classList.remove('active');
    });
}

// ---------- Carousel ----------
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function updateCarousel() {
    const carouselWrapper = document.getElementById('carouselWrapper');
    if (carouselWrapper) {
        carouselWrapper.style.transform = `translateX(${-currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}
function goToSlide(index) { currentSlide = index; updateCarousel(); }
function nextSlide() { currentSlide = (currentSlide + 1) % totalSlides; updateCarousel(); }
function prevSlide() { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateCarousel(); }
if (totalSlides > 0) setInterval(nextSlide, 5000);

// ---------- Cart ----------
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
}
function updateCartDisplay() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = '🛒 Cart (' + count + ')';
    });
}
function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push(Object.assign({}, product, { qty: 1 }));
    }
    saveCart(cart);
    updateCartDisplay();
    showToast('"' + product.name + '" added to cart!');
}
window.addToCart = addToCart;
updateCartDisplay();

// ---------- Toast ----------
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:25px;font-size:14px;z-index:9999;opacity:0;transition:opacity 0.3s;pointer-events:none;';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ---------- Username display ----------
const username = localStorage.getItem('username');
document.querySelectorAll('.account-btn').forEach(btn => {
    if (username) {
        const link = btn.querySelector('a');
        if (link) link.textContent = '👤 ' + username;
        else btn.textContent = '👤 ' + username;
    }
});

// ---------- Logout button ----------
const logoutBtn = document.createElement('button');
logoutBtn.id = 'logoutBtn';
logoutBtn.textContent = '🚪 Log Out';
logoutBtn.style.cssText = 'position:fixed;bottom:20px;left:20px;background:#ffd000;border:none;border-radius:8px;padding:10px 16px;font-size:14px;font-weight:600;cursor:pointer;color:#1a1a1a;z-index:999;display:none;';
document.body.appendChild(logoutBtn);

if (localStorage.getItem('username')) logoutBtn.style.display = 'block';

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    const path = window.location.pathname;
    if (path.includes('categoryItems')) window.location.href = '../../login.html';
    else if (path.includes('marketplaceCategories')) window.location.href = '../login.html';
    else window.location.href = 'login.html';
});

// ---------- Chat ----------
const chatData = {
    1: { name: 'Alice', avatar: 'A', messages: [
        { sent: false, text: 'Hey! How are you?', time: '10:30 AM' },
        { sent: true, text: "Hi! I'm good, thanks!", time: '10:31 AM' },
        { sent: false, text: 'Great! Want to grab coffee later?', time: '10:32 AM' }
    ]},
    2: { name: 'Bob Smith', avatar: 'B', messages: [
        { sent: false, text: 'Did you finish the project?', time: '2:15 PM' },
        { sent: true, text: 'Almost done, will complete by tomorrow', time: '2:20 PM' }
    ]},
    3: { name: 'Carol Johnson', avatar: 'C', messages: [
        { sent: true, text: 'See you at the meeting!', time: '9:00 AM' },
        { sent: false, text: 'Sure! See you there 👋', time: '9:05 AM' }
    ]},
    4: { name: 'David', avatar: 'D', messages: [
        { sent: false, text: 'Check out this link', time: '3:45 PM' },
        { sent: true, text: 'Thanks for sharing!', time: '3:50 PM' }
    ]}
};

let currentChat = null;
const chatIcon = document.getElementById('chatIcon');
const chatList = document.getElementById('chatList');
const chatWindow = document.getElementById('chatWindow');
const closeListBtn = document.getElementById('closeListBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatHistory = document.getElementById('chatHistory');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function initializeChatList() {
    if (!chatHistory) return;
    chatHistory.innerHTML = '';
    Object.keys(chatData).forEach(id => {
        const chat = chatData[id];
        const lastMessage = chat.messages[chat.messages.length - 1];
        const item = document.createElement('div');
        item.className = 'chat-history-item';
        item.innerHTML = '<div class="chat-history-avatar">' + chat.avatar + '</div><div class="chat-history-info"><div class="chat-history-name">' + chat.name + '</div><div class="chat-history-preview">' + lastMessage.text + '</div></div>';
        item.addEventListener('click', () => openChat(id));
        chatHistory.appendChild(item);
    });
}

function openChat(id) {
    currentChat = id;
    const chat = chatData[id];
    document.getElementById('chatAvatar').textContent = chat.avatar;
    document.getElementById('chatName').textContent = chat.name;
    chatMessages.innerHTML = '';
    chat.messages.forEach(msg => {
        const el = document.createElement('div');
        el.className = 'message ' + (msg.sent ? 'sent' : 'received');
        el.innerHTML = '<div><div class="message-bubble">' + msg.text + '</div><div class="message-time">' + msg.time + '</div></div>';
        chatMessages.appendChild(el);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatList.classList.remove('active');
    chatWindow.classList.add('active');
    messageInput.focus();
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentChat) return;
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    chatData[currentChat].messages.push({ sent: true, text, time });
    messageInput.value = '';
    const el = document.createElement('div');
    el.className = 'message sent';
    el.innerHTML = '<div><div class="message-bubble">' + text + '</div><div class="message-time">' + time + '</div></div>';
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatIcon) chatIcon.addEventListener('click', () => chatList.classList.add('active'));
if (closeListBtn) closeListBtn.addEventListener('click', () => chatList.classList.remove('active'));
if (closeChatBtn) closeChatBtn.addEventListener('click', () => chatWindow.classList.remove('active'));
if (sendBtn) sendBtn.addEventListener('click', sendMessage);
if (messageInput) messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
initializeChatList();