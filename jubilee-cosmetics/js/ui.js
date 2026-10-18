// UI Interactions for Jubilee Cosmetics
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initLanguageSwitch();
    initCartEvents();
    initMobileMenu();
    renderFeaturedProducts();
});

function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchOverlay) searchOverlay.classList.add('active');
            if (searchInput) searchInput.focus();
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            if (searchOverlay) searchOverlay.classList.remove('active');
        });
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) searchOverlay.classList.remove('active');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length < 2) {
                searchSuggestions.innerHTML = '';
                return;
            }
            const results = searchProducts(query);
            searchSuggestions.innerHTML = results.slice(0, 5).map(p => `
                <div class="suggestion-item" onclick="selectProduct(${p.id})">
                    ${CONFIG.language === 'th' ? p.name : p.nameEn}
                </div>
            `).join('');
        });
    }
}

function selectProduct(productId) {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) overlay.classList.remove('active');
    window.location.href = `product-detail.html?id=${productId}`;
}

function initLanguageSwitch() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            CONFIG.language = lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFeaturedProducts();
            if (document.getElementById('cartDrawer').classList.contains('open')) {
                cart.renderCart();
            }
        });
    });
}

function initCartEvents() {
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeCartBtn = document.querySelector('.close-cart');
    
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeCart);
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
}

function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
}

function renderFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    const featured = getFeaturedProducts();
    grid.innerHTML = featured.map(product => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.svg'">
            ${product.discount ? `<span class="badge">-${product.discount}%</span>` : ''}
            <div class="card-overlay">
                <h3>${CONFIG.language === 'th' ? product.name : product.nameEn}</h3>
                <p>${CONFIG.language === 'th' ? product.description : product.descriptionEn}</p>
                <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:bold; color:var(--primary-color);">
                        ${CONFIG.currencySymbol} ${(product.salePrice || product.price).toLocaleString()}
                    </span>
                    ${product.salePrice ? `<span style="color:var(--text-light); text-decoration:line-through; font-size:0.9rem;">
                        ${CONFIG.currencySymbol} ${product.price.toLocaleString()}
                    </span>` : ''}
                </div>
                <button class="btn btn-primary" style="width:100%; margin-top:10px;" onclick="event.stopPropagation(); cart.add(${product.id})">
                    ${t('addToCart')}
                </button>
            </div>
        </div>
    `).join('');
}