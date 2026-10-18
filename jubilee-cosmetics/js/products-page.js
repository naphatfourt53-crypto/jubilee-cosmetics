// Products page logic
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryDesc = document.getElementById('categoryDesc');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const noResults = document.getElementById('noResults');

    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';
    let currentSort = 'featured';

    // Set active filter button
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === currentCategory) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-category');
            currentSort = 'featured';
            sortSelect.value = 'featured';
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateURL();
            renderProducts();
        });
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    function updateURL() {
        const newUrl = currentCategory === 'all' 
            ? 'products.html' 
            : `products.html?category=${currentCategory}`;
        window.history.replaceState({}, '', newUrl);
    }

    function getCategoryName(cat) {
        const names = {
            all: 'ทั้งหมด',
            earrings: 'ต่างหู',
            necklaces: 'สร้อยคอ',
            bracelets: 'กำไลข้อมือ',
            rings: 'แหวน',
            makeup: 'เครื่องสำอาง',
            skincare: 'สกินแคร์'
        };
        return names[cat] || 'ทั้งหมด';
    }

    function renderProducts() {
        let products = getProductsByCategory(currentCategory);

        // Sort
        if (currentSort === 'price-asc') {
            products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (currentSort === 'price-desc') {
            products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        } else if (currentSort === 'name') {
            products.sort((a, b) => {
                const nameA = CONFIG.language === 'th' ? a.name : a.nameEn;
                const nameB = CONFIG.language === 'th' ? b.name : b.nameEn;
                return nameA.localeCompare(nameB);
            });
        }

        if (categoryDesc) {
            categoryDesc.textContent = `พบสินค้า ${products} รายการในหมวด ${getCategoryName(currentCategory)}`;
        }

        if (products.length === 0) {
            productGrid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        productGrid.style.display = 'grid';
        noResults.style.display = 'none';

        productGrid.innerHTML = products.map(product => {
            const salePrice = product.salePrice || product.price;
            const originalPrice = product.price;
            const discount = product.discount;
            const isTh = CONFIG.language === 'th';

            return `
                <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
                    ${discount ? `<span class="badge">-${discount}%</span>` : ''}
                    <div class="card-overlay">
                        <h3>${isTh ? product.name : product.nameEn}</h3>
                        <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">
                                ${CONFIG.currencySymbol} ${salePrice.toLocaleString()}
                            </span>
                            ${discount ? `<span style="color:var(--text-light); text-decoration:line-through; font-size:0.9rem;">
                                ${CONFIG.currencySymbol} ${originalPrice.toLocaleString()}
                            </span>` : ''}
                        </div>
                        <button class="btn btn-primary" style="width:100%; margin-top:12px;" onclick="event.stopPropagation(); cart.add(${product.id})">
                            ${t('addToCart')}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderProducts();
});