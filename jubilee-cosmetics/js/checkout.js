// Checkout page logic for Jubilee Cosmetics
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    
    if(typeof cart !== 'undefined') {
        cart.updateBadge();
        renderCheckoutSummary();
    }

    // Shipping form - go to payment
    window.goToStep = (step) => {
        document.querySelectorAll('.checkout-step').forEach(s => s.style.display = 'none');
        document.getElementById('step-' + step).style.display = 'block';
        
        // Validate shipping info before proceeding
        if(step === 'payment') {
            const name = document.getElementById('ship-name').value;
            const email = document.getElementById('ship-email').value;
            const phone = document.getElementById('ship-phone').value;
            const address = document.getElementById('ship-address').value;
            
            if(!name || !email || !phone || !address) {
                cart.showToast('กรุณากรอกข้อมูลให้ครบถ้วน');
                document.getElementById('step-info').style.display = 'block';
                return;
            }
        }
    };

    // Payment selection
    window.selectPayment = (method) => {
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.style.borderColor = 'transparent';
            opt.querySelector('.radio-check').style.borderColor = 'var(--border-color)';
            opt.querySelector('.radio-check div')?.style.display = 'none';
        });
        
        const selected = document.getElementById('pay-' + method);
        selected.style.borderColor = 'var(--primary-color)';
        selected.querySelector('.radio-check').style.borderColor = 'var(--primary-color)';
        const check = selected.querySelector('.radio-check div');
        if(check) check.style.display = 'block';
        
        const cardFields = document.getElementById('card-fields');
        if(method === 'card') {
            cardFields.style.display = 'block';
        } else {
            cardFields.style.display = 'none';
        }
    };

    // Initialize with promptpay selected
    selectPayment('promptpay');

    // Go to review
    window.placeOrder = () => {
        const agree = document.getElementById('agree-terms').checked;
        if(!agree) {
            cart.showToast('กรุณายอมรับข้อกำหนดการใช้บริการ');
            return;
        }
        
        // Simulate order processing
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = 'กำลังดำเนินการ...';
        btn.disabled = true;
        
        setTimeout(() => {
            const total = cart.getTotal();
            const orderNumber = 'JUB-' + Date.now().toString().slice(-6);
            const date = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
            
            // Save order to admin DB
            const orders = adminDB.get('orders');
            orders.unshift({
                id: orderNumber,
                customer: document.getElementById('ship-name').value,
                date: date,
                total: total,
                status: 'รอชำระเงิน'
            });
            adminDB.set('orders', orders);
            
            // Clear cart
            cart.items = [];
            cart.save();
            cart.updateBadge();
            
            // Show success
            document.getElementById('successOverlay').classList.add('active');
            document.getElementById('success-order-number').textContent = orderNumber;
            document.getElementById('success-order-total').textContent = '฿ ' + total.toLocaleString();
            document.getElementById('success-order-date').textContent = date;
            
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    };

    // Close success overlay when clicking outside
    document.getElementById('successOverlay').addEventListener('click', (e) => {
        if(e.target === document.getElementById('successOverlay')) {
            document.getElementById('successOverlay').classList.remove('active');
        }
    });
});

function renderCheckoutSummary() {
    const itemsContainer = document.getElementById('sidebar-items');
    const reviewContainer = document.getElementById('review-items');
    const subtotalEl = document.getElementById('sidebar-subtotal');
    const shippingEl = document.getElementById('sidebar-shipping');
    const totalEl = document.getElementById('sidebar-total');
    const reviewSubtotal = document.getElementById('review-subtotal');
    const reviewShipping = document.getElementById('review-shipping');
    const reviewTotal = document.getElementById('review-total');
    const freeShip = document.getElementById('sidebar-free-ship');
    
    if(!itemsContainer) return;

    const subtotal = cart.getTotal();
    const shipping = subtotal >= CONFIG.shipping.freeThreshold ? 0 : 150;
    const total = subtotal + shipping;

    // Sidebar items
    itemsContainer.innerHTML = cart.items.map(item => `
        <div style="display:flex; gap:10px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid var(--border-color);">
            <img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:8px;" onerror="this.src='assets/placeholder.svg'">
            <div style="flex:1;">
                <div style="font-weight:600; font-size:0.9rem; color:var(--text-main); line-height:1.3;">${item.name}</div>
                <div style="font-size:0.85rem; color:var(--text-light);">x${item.qty}</div>
            </div>
            <div style="font-weight:600; color:var(--primary-color); font-size:0.9rem;">
                ฿ ${(item.price * item.qty).toLocaleString()}
            </div>
        </div>
    `).join('');

    // Review items (same as sidebar but can be different layout)
    if(reviewContainer) {
        reviewContainer.innerHTML = cart.items.map(item => `
            <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-color);">
                <div>
                    <div style="font-weight:600; font-size:0.95rem; color:var(--text-main);">${item.name}</div>
                    <div style="font-size:0.85rem; color:var(--text-light);">จำนวน ${item.qty} ชิ้น</div>
                </div>
                <div style="font-weight:600; color:var(--primary-color); font-size:0.95rem;">฿ ${(item.price * item.qty).toLocaleString()}</div>
            </div>
        `).join('');
    }

    // Totals
    if(subtotalEl) subtotalEl.textContent = '฿ ' + subtotal.toLocaleString();
    if(shippingEl) shippingEl.textContent = shipping === 0 ? 'ฟรี' : '฿ ' + shipping.toLocaleString();
    if(totalEl) totalEl.textContent = '฿ ' + total.toLocaleString();
    if(reviewSubtotal) reviewSubtotal.textContent = '฿ ' + subtotal.toLocaleString();
    if(reviewShipping) reviewShipping.textContent = shipping === 0 ? 'ฟรี' : '฿ ' + shipping.toLocaleString();
    if(reviewTotal) reviewTotal.textContent = '฿ ' + total.toLocaleString();
    
    if(freeShip) {
        freeShip.style.display = subtotal >= CONFIG.shipping.freeThreshold ? 'block' : 'none';
        if(subtotal < CONFIG.shipping.freeThreshold && subtotal > 0) {
            freeShip.textContent = 'ซื้อเพิ่มอีก ฿ ' + (CONFIG.shipping.freeThreshold - subtotal).toLocaleString() + ' รับจัดส่งฟรี';
            freeShip.style.color = 'var(--text-light)';
            freeShip.style.display = 'block';
        }
    }
}

// Re-render when cart changes (called from cart.js)
window.updateCheckoutSummary = renderCheckoutSummary;