const sampleProducts = [
  { id: '0011', name: 'Caban (Black)', desc: 'Durable black caban for motorcycle body protection. Scratch-resistant and lightweight.', price: 280, stock: 15, category: 'Accessories', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0057', name: 'PIAA Horn', desc: 'High-quality PIAA motorcycle horn with superior sound clarity.', price: 700, stock: 8, category: 'Accessories', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0015', name: 'Lamented (Tribal Blue)', desc: 'Eye-catching tribal blue laminated sticker, UV-resistant.', price: 300, stock: 22, category: 'Accessories', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0058', name: 'CVT Cleaner', desc: 'Professional CVT belt and pulley cleaner. Improves belt life and performance.', price: 180, stock: 3, category: 'Engine Parts', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0023', name: 'Engine Oil (1L)', desc: 'Premium fully synthetic engine oil. Provides superior engine protection.', price: 450, stock: 20, category: 'Engine Parts', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0034', name: 'Brake Disc (Front)', desc: 'Heavy-duty front brake disc. Superior stopping power and heat dissipation.', price: 1200, stock: 5, category: 'Brake Parts', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0045', name: 'Chain Lube', desc: 'O-ring safe chain lubricant. Protects against rust and reduces friction.', price: 180, stock: 25, category: 'Engine Parts', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0062', name: 'LED Headlight', desc: 'High-output LED headlight with improved visibility.', price: 890, stock: 6, category: 'Accessories', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0063', name: 'LED Tail Light', desc: 'Compact LED tail light with sharp beam.', price: 720, stock: 11, category: 'Accessories', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' },
  { id: '0065', name: 'Motorcycle Helmet', desc: 'ECE-certified helmet with comfortable lining.', price: 1950, stock: 6, category: 'Accessories', img: 'https://res.cloudinary.com/dcl8dksb0/image/upload/v1778335391/Screenshot_2026-05-09_220256_h68zbe.png' }
];

const pageSize = 6;
let currentPage = 1;
let filteredProducts = sampleProducts.slice();

function formatCurrency(v){ return '₱' + v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function renderProducts(page = 1){
  const grid = document.getElementById('productsGrid');
  const info = document.getElementById('productsInfo');
  if(!grid) return;

  const total = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  currentPage = Math.min(Math.max(1, page), totalPages);

  const start = (currentPage -1) * pageSize;
  const pageItems = filteredProducts.slice(start, start + pageSize);

  grid.innerHTML = '';
  pageItems.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const lowStock = p.stock <= 5;
    card.innerHTML = `
      <div class="product-top">
        <div class="product-id">#${p.id}</div>
        <span class="product-badge">${p.category}</span>
        ${lowStock ? '<span class="low-stock">Low Stock</span>' : ''}
        <img src="${p.img}" alt="${p.name}">
        <div class="card-icon">ⓟ</div>
      </div>
      <div class="product-body">
        <div class="product-title">${p.name}</div>
        <div class="product-desc">${p.desc || ''}</div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="product-price">${formatCurrency(p.price)}</div>
        </div>
        <div class="stock-row">
          <div class="stock-bar"><div class="stock-fill" style="width:${Math.max(6, Math.min(100, (p.stock/30)*100))}%"></div></div>
          <div class="stock-count">${p.stock} left</div>
        </div>
        <button class="add-btn" data-id="${p.id}">🛒 Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  if(info) info.textContent = `${total} item${total===1?'':'s'} · page ${currentPage} of ${totalPages}`;
  renderPagination(totalPages);
}

function renderPagination(totalPages){
  const el = document.getElementById('productsPagination');
  if(!el) return;
  el.innerHTML = '';
  if(totalPages <= 1) return;

  const makeBtn = (label, page, active=false) => {
    const b = document.createElement('button');
    b.textContent = label;
    if(active) b.classList.add('active');
    b.addEventListener('click', () => renderProducts(page));
    return b;
  };

  el.appendChild(makeBtn('←', Math.max(1, currentPage-1)));
  for(let i=1;i<=totalPages;i++){
    el.appendChild(makeBtn(i, i, i===currentPage));
  }
  el.appendChild(makeBtn('→', Math.min(totalPages, currentPage+1)));
}

function setupSearchAndFilters(){
  const search = document.querySelector('.search-container .form-control');
  const filter = document.querySelector('.filter-dropdown');

  // category pills
  const pills = document.querySelectorAll('.pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e)=>{
      pills.forEach(pl => pl.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;
      if(cat === 'all') filteredProducts = sampleProducts.slice(); else filteredProducts = sampleProducts.filter(x => x.category === cat);
      renderProducts(1);
    });
  });

  // update counts on pills
  const counts = {};
  sampleProducts.forEach(p => counts[p.category] = (counts[p.category] || 0) + 1);
  document.querySelectorAll('.pill').forEach(p=>{
    const cat = p.dataset.cat;
    const span = p.querySelector('.pill-count');
    if(!span) return;
    if(cat === 'all') span.textContent = sampleProducts.length; else span.textContent = (counts[cat]||0);
  });

  search && search.addEventListener('input', (e)=>{
    const term = e.target.value.trim().toLowerCase();
    filteredProducts = sampleProducts.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    renderProducts(1);
  });

  filter && filter.addEventListener('change', (e)=>{
    const val = e.target.value;
    if(!val){ filteredProducts = sampleProducts.slice(); renderProducts(1); return; }
    const [min,max] = val.includes('+') ? [Number(val.replace('+','')), Infinity] : val.split('-').map(Number);
    filteredProducts = sampleProducts.filter(p => p.price >= min && (max===Infinity || p.price <= max));
    renderProducts(1);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  setupSearchAndFilters();
  renderProducts(1);
  document.getElementById('productsGrid')?.addEventListener('click', (e)=>{
    const btn = e.target.closest('.add-btn');
    if(!btn) return;
    const id = btn.dataset.id;
    alert('Add to cart: ' + id);
  });
});
