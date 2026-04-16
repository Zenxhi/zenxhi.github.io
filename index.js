// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

// Theme toggle button click handler
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Update localStorage and button icon
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});

// Menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
});

// Carousel functions (for homepage)
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function updateCarousel() {
    const offset = -currentSlide * 100;
    const carouselWrapper = document.getElementById('carouselWrapper');
    if (carouselWrapper) {
        carouselWrapper.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Auto-rotate carousel every 5 seconds (only if carousel exists)
if (totalSlides > 0) {
    setInterval(nextSlide, 5000);
}

// Chat Application
const chatData = {
    1: {
        name: 'Alice',
        avatar: 'A',
        messages: [
            { sent: false, text: 'Hey! How are you?', time: '10:30 AM' },
            { sent: true, text: 'Hi! I\'m good, thanks for asking!', time: '10:31 AM' },
            { sent: false, text: 'Great! Want to grab coffee later?', time: '10:32 AM' },
        ]
    },
    2: {
        name: 'Bob Smith',
        avatar: 'B',
        messages: [
            { sent: false, text: 'Did you finish the project?', time: '2:15 PM' },
            { sent: true, text: 'Almost done, will complete by tomorrow', time: '2:20 PM' },
        ]
    },
    3: {
        name: 'Carol Johnson',
        avatar: 'C',
        messages: [
            { sent: true, text: 'See you at the meeting!', time: '9:00 AM' },
            { sent: false, text: 'Sure! See you there 👋', time: '9:05 AM' },
        ]
    },
    4: {
        name: 'David',
        avatar: 'D',
        messages: [
            { sent: false, text: 'Check out this link', time: '3:45 PM' },
            { sent: true, text: 'Thanks for sharing!', time: '3:50 PM' },
        ]
    },
};

let currentChat = null;

// DOM Elements
const chatIcon = document.getElementById('chatIcon');
const chatList = document.getElementById('chatList');
const chatWindow = document.getElementById('chatWindow');
const closeListBtn = document.getElementById('closeListBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatHistory = document.getElementById('chatHistory');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Initialize chat history list
function initializeChatList() {
    chatHistory.innerHTML = '';
    Object.keys(chatData).forEach(id => {
        const chat = chatData[id];
        const lastMessage = chat.messages[chat.messages.length - 1];
        const item = document.createElement('div');
        item.className = 'chat-history-item';
        item.innerHTML = `
            <div class="chat-history-avatar">${chat.avatar}</div>
            <div class="chat-history-info">
                <div class="chat-history-name">${chat.name}</div>
                <div class="chat-history-preview">${lastMessage.text}</div>
            </div>
        `;
        item.addEventListener('click', () => openChat(id));
        chatHistory.appendChild(item);
    });
}

// Open chat window
function openChat(id) {
    currentChat = id;
    const chat = chatData[id];

    document.getElementById('chatAvatar').textContent = chat.avatar;
    document.getElementById('chatName').textContent = chat.name;

    // Display messages
    chatMessages.innerHTML = '';
    chat.messages.forEach(msg => {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${msg.sent ? 'sent' : 'received'}`;
        messageEl.innerHTML = `
            <div>
                <div class="message-bubble">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `;
        chatMessages.appendChild(messageEl);
    });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Hide list and show chat window
    chatList.classList.remove('active');
    chatWindow.classList.add('active');
    messageInput.focus();
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentChat) return;

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    chatData[currentChat].messages.push({
        sent: true,
        text: text,
        time: time
    });

    messageInput.value = '';

    // Refresh messages display
    const messageEl = document.createElement('div');
    messageEl.className = 'message sent';
    messageEl.innerHTML = `
        <div>
            <div class="message-bubble">${text}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
chatIcon.addEventListener('click', () => {
    chatList.classList.add('active');
});

closeListBtn.addEventListener('click', () => {
    chatList.classList.remove('active');
});

closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Initialize
initializeChatList();

// Theme synchronization - listen for theme changes from other pages
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        if (e.newValue === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
        }
    }
});
