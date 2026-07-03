// Sample data for demonstration
const sampleData = {
    transactions: [
        {
            id: '0011',
            date: '2026-03-23',
            customer: 'Ariel',
            items: 'Caban (Black)\nBrake Pads (Set)',
            amount: 280,
            status: 'Paid',
            mechanic: 'Edison'
        },
        {
            id: '0057',
            date: '2026-03-23',
            customer: 'Rin',
            items: 'PIAA Horn\nUnderglow LED Kit',
            amount: 750,
            status: 'Paid',
            mechanic: 'Dhie Jhay'
        },
        {
            id: '0015',
            date: '2026-03-23',
            customer: 'Arjay',
            items: 'Lamented (Tribal Blue)',
            amount: 300,
            status: 'Paid',
            mechanic: 'Edison'
        },
        {
            id: '0058',
            date: '2026-03-23',
            customer: 'Kim',
            items: 'CVT Cleaner\nSlider Piece\nCenter Spring',
            amount: 980,
            status: 'Paid',
            mechanic: 'Dhie Jhay'
        },
        {
            id: '0023',
            date: '2026-03-22',
            customer: 'Mark',
            items: 'Engine Oil (1L)\nOil Filter',
            amount: 450,
            status: 'Paid',
            mechanic: 'Edison'
        },
        {
            id: '0034',
            date: '2026-03-22',
            customer: 'Lisa',
            items: 'Brake Disc (Front)',
            amount: 1200,
            status: 'Paid',
            mechanic: 'Dhie Jhay'
        },
        {
            id: '0045',
            date: '2026-03-21',
            customer: 'Carlos',
            items: 'Chain Lube\nSprocket Set',
            amount: 650,
            status: 'Paid',
            mechanic: 'Edison'
        },
        {
            id: '0062',
            date: '2026-03-20',
            customer: 'Ana',
            items: 'LED Headlight',
            amount: 890,
            status: 'Paid',
            mechanic: 'Dhie Jhay'
        }
    ],
    inventory: [
        { id: '0011', name: 'Caban (Black)', price: 280, stock: 15 },
        { id: '0057', name: 'PIAA Horn', price: 700, stock: 8 },
        { id: '0015', name: 'Lamented (Tribal Blue)', price: 300, stock: 22 },
        { id: '0058', name: 'CVT Cleaner', price: 180, stock: 3 },
        { id: '0023', name: 'Engine Oil (1L)', price: 450, stock: 20 },
        { id: '0024', name: 'Oil Filter', price: 120, stock: 18 },
        { id: '0034', name: 'Brake Disc (Front)', price: 1200, stock: 5 },
        { id: '0035', name: 'Brake Pads (Set)', price: 280, stock: 12 },
        { id: '0045', name: 'Chain Lube', price: 180, stock: 25 },
        { id: '0046', name: 'Sprocket Set', price: 650, stock: 7 },
        { id: '0056', name: 'Slider Piece', price: 420, stock: 9 },
        { id: '0057', name: 'Center Spring', price: 380, stock: 14 },
        { id: '0061', name: 'Underglow LED Kit', price: 750, stock: 4 },
        { id: '0062', name: 'LED Headlight', price: 890, stock: 6 },
        { id: '0063', name: 'LED Tail Light', price: 720, stock: 11 },
        { id: '0064', name: 'Riding Gloves', price: 620, stock: 14 },
        { id: '0065', name: 'Motorcycle Helmet', price: 1950, stock: 6 },
        { id: '0066', name: 'Disc Rotor (Rear)', price: 980, stock: 5 },
        { id: '0067', name: 'Air Filter', price: 210, stock: 18 },
        { id: '0068', name: 'Spark Plug Set', price: 340, stock: 13 },
        { id: '0069', name: 'Bike Cover', price: 540, stock: 10 },
        { id: '0070', name: 'Fuel Line Kit', price: 420, stock: 8 }
    ],
    mechanics: [
        {
            id: 1,
            name: 'Edison',
            specialty: 'Engine & Brakes',
            email: 'edison@mmps.com',
            avatar: 'E',
            avatarColor: 'orange',
            totalJobs: 4,
            completedJobs: 4,
            inProgress: 0,
            pending: 0,
            laborToday: 0
        },
        {
            id: 2,
            name: 'Dhie Jhay',
            specialty: 'Electrical & CVT',
            email: 'dhiejhay@mmps.com',
            avatar: 'DJ',
            avatarColor: 'purple',
            totalJobs: 4,
            completedJobs: 4,
            inProgress: 0,
            pending: 0,
            laborToday: 0
        }
    ],
    users: [
        { id: 'U001', name: 'Ariel', email: 'ariel@email.com', phone: '09123456789', joinedDate: '2026-01-15' },
        { id: 'U002', name: 'Rin', email: 'rin@email.com', phone: '09234567890', joinedDate: '2026-02-10' },
        { id: 'U003', name: 'Arjay', email: 'arjay@email.com', phone: '09345678901', joinedDate: '2026-02-20' },
        { id: 'U004', name: 'Kim', email: 'kim@email.com', phone: '09456789012', joinedDate: '2026-03-01' },
        { id: 'U005', name: 'Mark', email: 'mark@email.com', phone: '09567890123', joinedDate: '2026-03-05' },
        { id: 'U006', name: 'Lisa', email: 'lisa@email.com', phone: '09678901234', joinedDate: '2026-03-10' },
        { id: 'U007', name: 'Carlos', email: 'carlos@email.com', phone: '09789012345', joinedDate: '2026-03-12' },
        { id: 'U008', name: 'Ana', email: 'ana@email.com', phone: '09890123456', joinedDate: '2026-03-18' }
    ]
};

// Chart instances
let quarterlySalesChart, dailySalesChart, projectedRevenueChart;

// Inventory pagination state
const inventoryPageSize = 8;
let currentInventoryPage = 1;
let inventorySearchTerm = '';

// Initialize dashboard or section page
document.addEventListener('DOMContentLoaded', function () {
    const page = document.body.dataset.page || 'dashboard';

    if (page === 'dashboard') {
        initializeCharts();
        populateTransactionsTable();
        populateInventoryTable();
        populateMechanicsSection();
        populateUsersTable();
        setupNavigation();
        updateTimestamp();
        setInterval(updateTimestamp, 60000);
    } else if (page === 'revenue') {
        initializeCharts();
        setupNavigation();
        updateTimestamp();
        setInterval(updateTimestamp, 60000);
    } else if (page === 'transactions') {
        populateTransactionsTable();
        setupNavigation();
    } else if (page === 'inventory') {
        populateInventoryTable();
        setupNavigation();
    } else if (page === 'mechanics') {
        populateMechanicsSection();
        setupNavigation();
    } else {
        setupNavigation();
    }
});

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('timestamp').textContent = now.toLocaleDateString('en-US', options) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Initialize charts
function initializeCharts() {
    // Quarterly Sales Chart
    const quarterlySalesCanvas = document.getElementById('quarterlySalesChart');
    if (quarterlySalesCanvas) {
        const quarterlySalesCtx = quarterlySalesCanvas.getContext('2d');
        quarterlySalesChart = new Chart(quarterlySalesCtx, {
            type: 'line',
            data: {
                labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
                datasets: [{
                    label: 'Revenue',
                    data: [75, 20, 30, 25, 5, 10],
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#ff6b35',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { callback: function (value) { return value; } }
                    }
                }
            }
        });
    }

    // Daily Sales Chart
    const dailySalesCanvas = document.getElementById('dailySalesChart');
    if (dailySalesCanvas) {
        const dailySalesCtx = dailySalesCanvas.getContext('2d');
        dailySalesChart = new Chart(dailySalesCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Brake Parts',
                        data: [150, 120, 145, 130, 160, 200, 180],
                        borderColor: '#ff6b35',
                        backgroundColor: 'rgba(255, 107, 53, 0.05)',
                        borderWidth: 2,
                        pointRadius: 4,
                        tension: 0.4
                    },
                    {
                        label: 'Accessories',
                        data: [140, 110, 130, 125, 150, 180, 170],
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.05)',
                        borderWidth: 2,
                        pointRadius: 4,
                        tension: 0.4
                    },
                    {
                        label: 'Engine Parts',
                        data: [100, 90, 110, 105, 120, 140, 130],
                        borderColor: '#52c77a',
                        backgroundColor: 'rgba(82, 199, 122, 0.05)',
                        borderWidth: 2,
                        pointRadius: 4,
                        tension: 0.4
                    },
                    {
                        label: 'Other',
                        data: [50, 40, 50, 45, 60, 70, 65],
                        borderColor: '#9b6dd0',
                        backgroundColor: 'rgba(155, 109, 208, 0.05)',
                        borderWidth: 2,
                        pointRadius: 4,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    const projectedRevenueCanvas = document.getElementById('projectedRevenueChart');
    if (projectedRevenueCanvas) {
        const projectedRevenueCtx = projectedRevenueCanvas.getContext('2d');
        projectedRevenueChart = new Chart(projectedRevenueCtx, {
            type: 'bar',
            data: {
                labels: ['Q1 2024', 'Q2 2025', 'Q1 2026'],
                datasets: [{
                    label: 'Projected Revenue',
                    data: [950, 1100, 750],
                    backgroundColor: '#ff6b35',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: function (value) { return '₱' + value + 'k'; } } }
                }
            }
        });
    }
}

// Populate Transactions Table
function populateTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    sampleData.transactions.forEach(transaction => {
        const statusClass = `status-${transaction.status.toLowerCase()}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" style="color: #4a90e2; text-decoration: none;">${transaction.id}</a></td>
            <td>${transaction.date}</td>
            <td><strong>${transaction.customer}</strong></td>
            <td>${transaction.items.replace(/\n/g, '<br>')}</td>
            <td class="price-text">₱${transaction.amount}</td>
            <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
            <td>${transaction.mechanic}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" title="Edit">✏️</button>
                    <button class="btn-small btn-delete" title="Delete">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate Inventory Table
function getFilteredInventoryItems() {
    const term = inventorySearchTerm.trim().toLowerCase();
    if (!term) return sampleData.inventory;

    return sampleData.inventory.filter(item => {
        return (
            item.id.toLowerCase().includes(term) ||
            item.name.toLowerCase().includes(term) ||
            item.price.toString().includes(term) ||
            item.stock.toString().includes(term)
        );
    });
}

function populateInventoryTable(page = 1) {
    const tbody = document.getElementById('inventoryTableBody');
    const info = document.querySelector('.inventory-info');
    const pagination = document.getElementById('inventoryPagination');
    if (!tbody) return;

    const items = getFilteredInventoryItems();
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / inventoryPageSize));
    currentInventoryPage = Math.min(Math.max(1, page), totalPages);

    const pageItems = items.slice((currentInventoryPage - 1) * inventoryPageSize, currentInventoryPage * inventoryPageSize);
    tbody.innerHTML = '';

    pageItems.forEach(item => {
        const stockClass = item.stock <= 5 ? 'low' : '';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" style="color: #4a90e2; text-decoration: none;">${item.id}</a></td>
            <td>${item.name}</td>
            <td class="price-text">₱${item.price}</td>
            <td class="stock-text ${stockClass}">${item.stock} units</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" title="Edit">✏️</button>
                    <button class="btn-small btn-delete" title="Delete">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    if (info) {
        info.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'} · page ${currentInventoryPage} of ${totalPages}`;
    }

    if (pagination) {
        renderInventoryPagination(totalPages);
    }
}

function renderInventoryPagination(totalPages) {
    const pagination = document.getElementById('inventoryPagination');
    if (!pagination) return;
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    const createButton = (label, page, disabled = false) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.dataset.page = page;
        button.className = 'pagination-button';
        if (disabled) {
            button.disabled = true;
            button.classList.add('disabled');
        }
        return button;
    };

    pagination.appendChild(createButton('← Previous', Math.max(1, currentInventoryPage - 1), currentInventoryPage === 1));

    for (let page = 1; page <= totalPages; page++) {
        const button = createButton(page, page, page === currentInventoryPage);
        if (page === currentInventoryPage) {
            button.classList.add('active');
        }
        pagination.appendChild(button);
    }

    pagination.appendChild(createButton('Next →', Math.min(totalPages, currentInventoryPage + 1), currentInventoryPage === totalPages));
}

function handleInventorySearch(event) {
    inventorySearchTerm = event.target.value;
    populateInventoryTable(1);
}

// Populate Mechanics Section
function populateMechanicsSection() {
    const container = document.getElementById('mechanicsList');
    if (!container) return;
    container.innerHTML = '';

    // Fetch mechanics from backend (requires admin JWT)
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        // Not authenticated — redirect to login
        window.location.href = 'adminLogin.html';
        return;
    }

    fetch('/api/mechanics/all', {
        headers: { 'Authorization': 'Bearer ' + adminToken }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                // Token invalid or expired — clear and redirect to login
                localStorage.removeItem('adminToken');
                window.location.href = 'adminLogin.html';
                throw new Error('Unauthorized');
            }
            return res.json();
        })
        .then(data => {
            const mechanics = (data && Array.isArray(data.mechanics)) ? data.mechanics : [];
            const renderList = mechanics.length ? mechanics : sampleData.mechanics;

            if (!renderList.length) {
                container.innerHTML = '<p>No mechanics found.</p>';
                return;
            }

            renderMechanicCards(renderList);
        })
        .catch(err => {
            console.error('Error fetching mechanics:', err);
            renderMechanicCards(sampleData.mechanics);
        });
}

function renderMechanicCards(mechanics) {
    const container = document.getElementById('mechanicsList');
    if (!container) return;
    container.innerHTML = '';

    mechanics.forEach(mechanic => {
        const card = document.createElement('div');
        card.className = 'mechanic-card';
        const fullName = (mechanic.firstName || '') + ' ' + (mechanic.lastName || '');
        card.innerHTML = `
            <div class="mechanic-header-row">
                <div class="mechanic-info">
                    <div class="mechanic-avatar orange">${(mechanic.firstName || '')[0] || 'M'}</div>
                    <div>
                        <div class="mechanic-name">${fullName.trim()}</div>
                        <div class="mechanic-specialty" style="color: #ff6b35;">${mechanic.specialization || 'General Service'}</div>
                        <div class="mechanic-email">📧 ${mechanic.email || 'not provided'}</div>
                    </div>
                </div>
                <div class="mechanic-actions">
                    <button class="btn-small btn-edit" title="Edit">✏️</button>
                    <button class="btn-small btn-delete" title="Delete">🗑️</button>
                </div>
            </div>
            <div class="mechanic-stats">
                <div class="mechanic-stat">
                    <div class="mechanic-stat-number">${mechanic.totalRepairs || 0}</div>
                    <div class="mechanic-stat-label">Total Jobs</div>
                </div>
                <div class="mechanic-stat">
                    <div class="mechanic-stat-number">${mechanic.averageRating || 0}</div>
                    <div class="mechanic-stat-label">Average Rating</div>
                </div>
                <div class="mechanic-stat">
                    <div class="mechanic-stat-number">${mechanic.isActive ? 'Active' : 'Idle'}</div>
                    <div class="mechanic-stat-label">Status</div>
                </div>
                <div class="mechanic-stat">
                    <div class="mechanic-stat-number">${mechanic.yearsOfExperience || 0}</div>
                    <div class="mechanic-stat-label">Years Experience</div>
                </div>
            </div>
            <div class="mechanic-labor">⭐ Total Labor Today <span style="float: right;">₱0</span></div>
        `;
        container.appendChild(card);
    });
}

// Populate Users Table
function populateUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    sampleData.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" style="color: #4a90e2; text-decoration: none;">${user.id}</a></td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.joinedDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" title="Edit">✏️</button>
                    <button class="btn-small btn-delete" title="Delete">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Setup Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item:not(.logout)');
    const sections = document.querySelectorAll('.section-content');
    if (!navItems.length || !sections.length) return;

    navItems.forEach(item => {
        const sectionId = item.getAttribute('data-section');
        if (!sectionId) return;

        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked item and corresponding section
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');

            // Redraw charts if they're visible
            setTimeout(() => {
                if (sectionId === 'dashboard') {
                    quarterlySalesChart?.resize();
                    dailySalesChart?.resize();
                } else if (sectionId === 'analytics') {
                    projectedRevenueChart?.resize();
                }
            }, 100);
        });
    });
}

// Event listeners for buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-edit')) {
        alert('Edit functionality would be implemented here');
    } else if (e.target.classList.contains('btn-delete')) {
        if (confirm('Are you sure you want to delete this item?')) {
            e.target.closest('tr') && e.target.closest('tr').remove();
        }
    } else if (e.target.classList.contains('btn-primary')) {
        const section = e.target.closest('.section-content');
        if (section && section.id === 'inventory') {
            alert('Add new inventory item functionality would be implemented here');
        } else if (section && section.id === 'mechanics') {
            alert('Add new mechanic functionality would be implemented here');
        } else if (section && section.id === 'products') {
            alert('Add new product functionality would be implemented here');
        }
    }
});

// Filter functionality for transactions
document.getElementById('filterDropdown')?.addEventListener('change', function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionsTableBody tr');

    rows.forEach(row => {
        if (filter === 'all') {
            row.style.display = '';
        } else {
            const statusCell = row.querySelector('.status-badge');
            if (statusCell.textContent.toLowerCase() === filter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
});

// Search functionality for transactions
document.querySelector('.search-filter input')?.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionsTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Search functionality for users
document.querySelector('.users-header input')?.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#usersTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Search functionality for inventory
const inventorySearchInput = document.querySelector('.inventory-header input');
inventorySearchInput?.addEventListener('input', handleInventorySearch);

document.getElementById('inventoryPagination')?.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName !== 'BUTTON' || !target.dataset.page) return;
    const page = parseInt(target.dataset.page, 10);
    if (!Number.isNaN(page)) {
        populateInventoryTable(page);
    }
});
