
// Global variables
let currentUser = null;
let workers = [
    {
        name: "Carlos Rodriguez",
        category: "Construction",
        experience: 8,
        wage: 25,
        location: "Austin, TX",
        skills: "Plumbing, electrical work, general construction",
        availability: "Full Time"
    },
    {
        name: "Sarah Johnson",
        category: "Cleaning",
        experience: 3,
        wage: 18,
        location: "Miami, FL",
        skills: "Residential cleaning, office cleaning, deep cleaning",
        availability: "Part Time"
    },
    {
        name: "Miguel Santos",
        category: "Farming",
        experience: 12,
        wage: 22,
        location: "Fresno, CA",
        skills: "Crop harvesting, irrigation, equipment operation",
        availability: "Seasonal"
    },
    {
        name: "Amy Chen",
        category: "General",
        experience: 2,
        wage: 16,
        location: "Denver, CO",
        skills: "Moving, warehouse work, general assistance",
        availability: "Flexible"
    },
    {
        name: "Roberto Martinez",
        category: "Construction",
        experience: 15,
        wage: 35,
        location: "Phoenix, AZ",
        skills: "Foreman experience, concrete work, project management",
        availability: "Full Time"
    },
    {
        name: "Lisa Thompson",
        category: "Cleaning",
        experience: 5,
        wage: 20,
        location: "Seattle, WA",
        skills: "Commercial cleaning, floor care, sanitization",
        availability: "Full Time"
    }
];

let connections = [];
let messages = [
    { user: "Maria (Cleaner)", time: "2 mins ago", text: "Looking for part-time cleaning work in downtown area. Available weekends!" },
    { user: "BuildCorp (Employer)", time: "5 mins ago", text: "Need 3 construction workers for a 2-week project starting Monday. Good pay!" },
    { user: "Ahmed (General)", time: "8 mins ago", text: "Hi everyone! New to the platform. Excited to find work opportunities." }
];


// Load workers
function loadWorkers() {
    const grid = document.getElementById('workers-grid');
    grid.innerHTML = workers.map(worker => `
                <div class="person-card">
                    <div class="person-header">
                        <div class="person-avatar">${worker.name.split(' ').map(n => n[0]).join('')}</div>
                        <div class="person-info">
                            <h3>${worker.name}</h3>
                            <span class="person-category">${worker.category}</span>
                        </div>
                    </div>
                    <div class="person-details">
                        <p><strong>Experience:</strong> ${worker.experience} years</p>
                        <p><strong>Wage:</strong> ${worker.wage}/hour</p>
                        <p><strong>Location:</strong> ${worker.location}</p>
                        <p><strong>Skills:</strong> ${worker.skills}</p>
                        <p><strong>Availability:</strong> ${worker.availability}</p>
                    </div>
                    <button class="contact-btn" onclick="contactWorker('${worker.name}')">Connect</button>
                </div>
            `).join('');
}

// Contact worker
function contactWorker(workerName) {
    const worker = workers.find(w => w.name === workerName);
    if (worker && !connections.find(c => c.name === workerName)) {
        connections.push(worker);
        alert(`Connected with ${workerName}! Check your Connections page.`);
    } else if (connections.find(c => c.name === workerName)) {
        alert(`You're already connected with ${workerName}!`);
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const messageText = input.value.trim();

    if (messageText) {
        const newMessage = {
            user: currentUser || "Anonymous User",
            time: "now",
            text: messageText
        };

        messages.unshift(newMessage);
        updateChat();
        input.value = '';
    }
}

function updateChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = messages.map(msg => `
                <div class="message">
                    <div class="message-header">${msg.user} - ${msg.time}</div>
                    <div>${msg.text}</div>
                </div>
            `).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Form handlers
function handleWorkerRegistration(event) {
    event.preventDefault();

    const formData = {
        type: 'worker',
        firstName: document.getElementById('worker-first-name').value,
        lastName: document.getElementById('worker-last-name').value,
        email: document.getElementById('worker-email').value,
        phone: document.getElementById('worker-phone').value,
        category: document.getElementById('worker-category').value,
        experience: document.getElementById('worker-experience').value,
        skills: document.getElementById('worker-skills').value,
        wage: document.getElementById('worker-wage').value,
        address: document.getElementById('worker-address').value,
        city: document.getElementById('worker-city').value,
        state: document.getElementById('worker-state').value,
        availability: document.getElementById('worker-availability').value
    };

    currentUser = `${formData.firstName} (${formData.category})`;

    // Add to workers array
    workers.push({
        name: `${formData.firstName} ${formData.lastName}`,
        category: formData.category,
        experience: parseInt(formData.experience),
        wage: parseFloat(formData.wage),
        location: `${formData.city}, ${formData.state}`,
        skills: formData.skills,
        availability: formData.availability
    });

    showSuccessMessage("Worker registration successful! Welcome to Labor Connect.");
    setTimeout(() => showPage('home'), 2000);
}

function handleEmployerRegistration(event) {
    event.preventDefault();

    const formData = {
        type: 'employer',
        companyName: document.getElementById('company-name').value,
        firstName: document.getElementById('employer-first-name').value,
        lastName: document.getElementById('employer-last-name').value,
        email: document.getElementById('employer-email').value,
        phone: document.getElementById('employer-phone').value,
        companyType: document.getElementById('company-type').value,
        address: document.getElementById('company-address').value,
        city: document.getElementById('company-city').value,
        state: document.getElementById('company-state').value,
        wageMin: document.getElementById('wage-min').value,
        wageMax: document.getElementById('wage-max').value,
        description: document.getElementById('company-description').value
    };

    currentUser = `${formData.firstName} (${formData.companyName})`;

    showSuccessMessage("Employer registration successful! Welcome to Labor Connect.");
    setTimeout(() => showPage('home'), 2000);
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple demo login
    currentUser = "Demo User";
    showSuccessMessage("Login successful! Welcome back.");
    setTimeout(() => showPage('home'), 2000);
}

function handleContact(event) {
    event.preventDefault();

    showSuccessMessage("Thank you for your message! We'll get back to you within 24 hours.");
    event.target.reset();
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;

    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(successDiv, formContainer.firstChild);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', function () {
    updateChat();

    // Enter key for chat
    document.getElementById('chat-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Load connections page
function loadConnections() {
    const grid = document.getElementById('connections-grid');
    if (connections.length === 0) {
        grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <h3 style="color: #666; margin-bottom: 1rem;">No connections yet</h3>
                        <p style="color: #888;">Connect with workers from the "Find People" page to see them here!</p>
                        <button class="btn btn-primary" onclick="showPage('find-people')" style="margin-top: 1rem;">Browse Workers</button>
                    </div>
                `;
    } else {
        grid.innerHTML = connections.map(worker => `
                    <div class="person-card">
                        <div class="person-header">
                            <div class="person-avatar">${worker.name.split(' ').map(n => n[0]).join('')}</div>
                            <div class="person-info">
                                <h3>${worker.name}</h3>
                                <span class="person-category">${worker.category}</span>
                            </div>
                        </div>
                        <div class="person-details">
                            <p><strong>Experience:</strong> ${worker.experience} years</p>
                            <p><strong>Wage:</strong> ${worker.wage}/hour</p>
                            <p><strong>Location:</strong> ${worker.location}</p>
                            <p><strong>Skills:</strong> ${worker.skills}</p>
                        </div>
                        <button class="contact-btn" onclick="sendDirectMessage('${worker.name}')">Send Message</button>
                    </div>
                `).join('');
    }
}

// Send direct message
function sendDirectMessage(workerName) {
    const message = prompt(`Send a message to ${workerName}:`);
    if (message) {
        alert(`Message sent to ${workerName}: "${message}"`);
    }
}

// Enhanced navigation with connection loading
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Remove active class from nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Add active class to clicked nav link
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Load page-specific content
    if (pageId === 'find-people') {
        loadWorkers();
    } else if (pageId === 'connections') {
        loadConnections();
    }
}

// Filter workers by category
function filterWorkers(category) {
    const filteredWorkers = category === 'all' ? workers : workers.filter(w => w.category.toLowerCase() === category);
    const grid = document.getElementById('workers-grid');

    grid.innerHTML = filteredWorkers.map(worker => `
                <div class="person-card">
                    <div class="person-header">
                        <div class="person-avatar">${worker.name.split(' ').map(n => n[0]).join('')}</div>
                        <div class="person-info">
                            <h3>${worker.name}</h3>
                            <span class="person-category">${worker.category}</span>
                        </div>
                    </div>
                    <div class="person-details">
                        <p><strong>Experience:</strong> ${worker.experience} years</p>
                        <p><strong>Wage:</strong> ${worker.wage}/hour</p>
                        <p><strong>Location:</strong> ${worker.location}</p>
                        <p><strong>Skills:</strong> ${worker.skills}</p>
                        <p><strong>Availability:</strong> ${worker.availability}</p>
                    </div>
                    <button class="contact-btn" onclick="contactWorker('${worker.name}')">Connect</button>
                </div>
            `).join('');
}

// Demo messages for chat (simulate activity)
setInterval(() => {
    const demoMessages = [
        { user: "Tom (Construction)", time: "just now", text: "Anyone available for weekend concrete work?" },
        { user: "Emma (Cleaner)", time: "just now", text: "Just finished a big office cleaning job. Feeling accomplished!" },
        { user: "FreshFarms Co.", time: "just now", text: "Hiring seasonal workers for apple harvest season. Great team environment!" },
        { user: "David (General)", time: "just now", text: "Thanks to Labor Connect, I found steady work! Highly recommend." },
        { user: "QuickClean Services", time: "just now", text: "Looking for 2 experienced cleaners for a commercial contract. Long-term opportunity!" },
        { user: "Maria (Farming)", time: "just now", text: "Harvest season is here! Anyone with tractor experience?" }
    ];

    if (Math.random() > 0.8) { // 20% chance every interval
        const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        messages.unshift(randomMessage);
        if (messages.length > 15) messages.pop(); // Keep chat manageable

        // Only update if chat page is visible
        if (document.getElementById('chat').classList.contains('active')) {
            updateChat();
        }
    }
}, 12000); // Check every 12 seconds
