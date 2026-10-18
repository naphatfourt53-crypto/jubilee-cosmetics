// Product detail page logic
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = getProductById(productId);

    if (!product) {
        document.body.innerHTML = '<div style="text-align:center; padding:100px;"><h2>ไม่พบสินค้าที่คุณค้นหา</h2><a href="products.html" class="btn btn-primary">กลับไปหน้าสินค้า</a></div>';
        return;
    }

    const isTh = CONFIG.language === 'th';
    const salePrice = product.salePrice || product.price;

    // Set page title
    document.title = `${product.name} | Jubilee Cosmetics`;

    // Fill in product details
    document.getElementById('productName').textContent = isTh ? product.name : product.nameEn;
    document.getElementById('salePrice').textContent = `${CONFIG.currencySymbol} ${salePrice.toLocaleString()}`;
    document.getElementById('originalPrice').textContent = product.salePrice 
        ? `${CONFIG.currencySymbol} ${product.price.toLocaleString()}` 
        : '';
    document.getElementById('productRating').textContent = product.rating;
    document.getElementById('reviewCount').textContent = product.reviews;
    document.getElementById('productDescription').textContent = isTh ? product.description : product.descriptionEn;
    document.getElementById('productCategory').textContent = getCategoryThai(product.category);
    document.getElementById('productSku').textContent = `JUB-${String(product.id).padStart(4, '0')}`;

    // Main image
    const mainImg = document.getElementById('mainProductImg');
    mainImg.src = product.image;
    mainImg.alt = product.name;

    // Discount badge
    const discountBadge = document.getElementById('discountBadge');
    if (product.discount) {
        discountBadge.textContent = `-${product.discount}%`;
        discountBadge.style.display = 'inline-block';
    } else {
        discountBadge.style.display = 'none';
    }

    // Thumbnails
    const thumbnailRow = document.querySelector('.thumbnail-row');
    const images = [product.image, product.image, product.image]; // In real app, multiple images
    images.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `ภาพที่ ${idx + 1}`;
        thumb.style.width = '70px';
        thumb.style.height = '70px';
        thumb.style.objectFit = 'cover';
        thumb.style.borderRadius = '6px';
        thumb.style.cursor = 'pointer';
        thumb.style.border = idx === 0 ? '2px solid var(--secondary-color)' : '1px solid var(--border-color)';
        thumb.onerror = function() { this.src = 'assets/placeholder.jpg'; };
        thumb.onclick = () => {
            mainImg.src = img;
            document.querySelectorAll('.thumbnail-row img').forEach(t => t.style.border = '1px solid var(--border-color)');
            thumb.style.border = '2px solid var(--secondary-color)';
        };
        thumbnailRow.appendChild(thumb);
    });

    // Quantity selector
    let qty = 1;
    const qtyInput = document.getElementById('productQty');
    window.changeQty = (delta) => {
        qty = Math.max(1, Math.min(99, qty + delta));
        qtyInput.value = qty;
    };
    qtyInput.addEventListener('change', (e) => {
        qty = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
        qtyInput.value = qty;
    });

    // Add to cart
    window.addToCartDetail = () => {
        cart.add(product.id, qty);
        // Show confirmation
        cart.showToast(`เพิ่ม ${product.name} ${qty} ชิ้นลงตะกร้าแล้ว`);
    };

    // Related products (same category, excluding self)
    const relatedContainer = document.querySelector('.related-products');
    const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
    relatedContainer.innerHTML = related.map(p => {
        const sp = p.salePrice || p.price;
        return `
            <div style="flex:0 0 auto; width:140px; text-align:center; cursor:pointer;" onclick="window.location.href='product-detail.html?id=${p.id}'">
                <img src="${p.image}" alt="${p.name}" style="width:100%; height:140px; object-fit:cover; border-radius:8px; margin-bottom:8px;" onerror="this.src='assets/placeholder.jpg'">
                <div style="font-size:0.85rem; font-weight:bold; margin-bottom:4px;">${isTh ? p.name : p.nameEn}</div>
                <div style="font-size:0.8rem; color:var(--text-light);">${CONFIG.currencySymbol} ${sp.toLocaleString()}</div>
            </div>
        `;
    }).join('');
});

function getCategoryThai(cat) {
    const map = {
        earrings: 'ต่างหู',
        necklaces: 'สร้อยคอ',
        bracelets: 'กำไลข้อมือ',
        rings: 'แหวน',
        makeup: 'เครื่องสำอาง',
        skincare: 'สกินแคร์'
    };
    return map[cat] || 'ทั่วไป';
}