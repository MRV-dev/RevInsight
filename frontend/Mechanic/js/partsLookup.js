// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('mechanicToken');
    const mechanic = localStorage.getItem('mechanic');
    
    if (!token || !mechanic) {
        window.location.href = 'mechanicLogin.html';
        return null;
    }
    
    return JSON.parse(mechanic);
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('mechanic');
    window.location.href = 'mechanicLogin.html';
}

let allParts = [];
let currentCategory = 'all';

// Category tab switching
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.getAttribute('data-category');
        filterAndDisplayParts();
    });
});

// Search and sort
document.getElementById('partsSearch').addEventListener('input', filterAndDisplayParts);
document.getElementById('sortSelect').addEventListener('change', filterAndDisplayParts);

// Load parts from backend
async function loadParts() {
    const mechanic = checkAuth();
    if (!mechanic) return;
    
    try {
        const response = await fetch('http://localhost:5000/api/mechanic/parts', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('mechanicToken')}`
            }
        });
        
        if (response.ok) {
            allParts = await response.json();
            updateStats();
            filterAndDisplayParts();
        }
    } catch (error) {
        console.error('Error loading parts:', error);
    }
}

// Update inventory statistics
function updateStats() {
    const available = allParts.filter(p => p.stock > 5).length;
    const lowStock = allParts.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = allParts.filter(p => p.stock === 0).length;
    
    document.getElementById('availableCount').textContent = available;
    document.getElementById('lowStockCount').textContent = lowStock;
    document.getElementById('outOfStockCount').textContent = outOfStock;
}

// Filter and display parts
function filterAndDisplayParts() {
    const searchTerm = document.getElementById('partsSearch').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    
    let filtered = allParts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase().includes(currentCategory));
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.itemId.toLowerCase().includes(searchTerm) ||
            p.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    filtered.sort((a, b) => {
        if (sortValue === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortValue === 'stock') {
            return b.stock - a.stock;
        } else if (sortValue === 'category') {
            return a.category.localeCompare(b.category);
        }
    });
    
    displayParts(filtered);
}

// Display parts in table
function displayParts(parts) {
    const tbody = document.getElementById('partsTableBody');
    const noResults = document.getElementById('noResults');
    
    if (!parts || parts.length === 0) {
        tbody.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    tbody.innerHTML = parts.map(part => {
        const categoryClass = `badge-${part.category.toLowerCase().replace(' ', '-')}`;
        let stockStatus = 'stock-in';
        let stockText = `${part.stock} in stock`;
        
        if (part.stock === 0) {
            stockStatus = 'stock-out';
            stockText = 'Out of stock';
        } else if (part.stock <= 5) {
            stockStatus = 'stock-low';
            stockText = `Low: ${part.stock}`;
        }
        
        return `
            <tr>
                <td><span class="part-id">${part.itemId}</span></td>
                <td><span class="part-name">${part.name}</span></td>
                <td><span class="category-badge ${categoryClass}">${part.category}</span></td>
                <td>${part.description || '-'}</td>
                <td>
                    <div class="stock-status">
                        <span class="stock-indicator ${stockStatus}"></span>
                        <span class="stock-text">${stockText}</span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Load parts on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadParts();
});
