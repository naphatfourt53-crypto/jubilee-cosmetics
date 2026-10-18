// Shopping Cart Logic for Jubilee Cosmetics
const Cart = {
    items: [],

    init() {
        this.load();
        this.updateBadge();
    },

    load() {
        const saved = localStorage.getItem('jubilee_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    },

    save() {
        localStorage.setItem('jubilee_cart', JSON.stringify(this.items));
    },

    add(productId, qty = 1) {
        const product = getProductById(productId);
        if (!product) return;

        const existing = this.items.find(item => item.id === productId);
        if (existing) {
            existing.qty += qty;
        } else {
            this.items.push({
                id: product.id,
                name: CONFIG.language === 'th' ? product.name : product.nameEn,
                price: product.salePrice || product.price,
                image: product.image,
                qty: qty
            });
        }
        this.save();
        this.updateBadge();
        this.showToast(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`);
    },

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateBadge();
        this.renderCart();
    },

    updateQty(productId, change) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                this.remove(productId);
            } else {
                this.save();
                this.updateBadge();
                this.renderCart();
            }
        }
    },

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    updateBadge() {
        const badge = document.getElementById('cart-count');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    },

    renderCart() {
        const container = document.getElementById('cartItems');
        const footer = document.getElementById('cartFooter');
        const emptyState = container.querySelector('.empty-cart');

        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <p>ยังไม่มีสินค้าในตะกร้า</p>
                    <button class="btn btn-primary" onclick="closeCart()" style="margin-top:20px;">ช้อปสินค้าต่อ</button>
                </div>
            `;
            if (footer) footer.innerHTML = '';
            return;
        }

        if (emptyState) emptyState.remove();

        container.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/placeholder.svg'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${CONFIG.currencySymbol} ${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="cart.updateQty(${item.id}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="cart.updateQty(${item.id}, 1)">+</button>
                    <span class="remove-item" onclick="cart.remove(${item.id})">ลบ</span>
                </div>
            </div>
        `).join('');

        const total = this.getTotal();
        const shipping = total >= CONFIG.shipping.freeThreshold ? 0 : 150;
        const grandTotal = total + shipping;

        if (footer) {
            footer.innerHTML = `
                <div class="cart-summary">
                    <span>ยอดรวมสินค้า:</span>
                    <span>${CONFIG.currencySymbol} ${total.toLocaleString()}</span>
                </div>
                <div class="cart-summary">
                    <span>ค่าจัดส่ง:</span>
                    <span>${shipping === 0 ? 'ฟรี' : CONFIG.currencySymbol + shipping.toLocaleString()}</span>
                </div>
                <div class="cart-total">
                    รวมทั้งหมด: ${CONFIG.currencySymbol} ${grandTotal.toLocaleString()}
                </div>
                ${total >= CONFIG.shipping.freeThreshold 
                    ? '<p style="color:var(--success-color); font-size:0.9rem; margin-bottom:15px;">✓ จัดส่งฟรี!</p>'
                    : `<p style="color:var(--text-light); font-size:0.9rem; margin-bottom:15px;">ซื้อเพิ่มอีก ${CONFIG.currencySymbol} ${(CONFIG.shipping.freeThreshold - total).toLocaleString()} รับจัดส่งฟรี</p>`}
                <button class="btn btn-primary checkout-btn" onclick="proceedToCheckout()">ชำระเงิน</button>
            `;
        }
    }
};

// Global cart instance
const cart = Cart;

function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        cart.renderCart();
    }
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function proceedToCheckout() {
    if (cart.items.length === 0) {
        cart.showToast('ตะกร้าสินค้าว่าง กรุณาเลือกสินค้า');
        return;
    }
    cart.showToast('กำลังเข้าสู่หน้าชำระเงิน... (จำลอง)');
    setTimeout(() => {
        alert('หน้าชำระเงินจะพัฒนาในเฟสถัดไป');
    }, 1000);
}