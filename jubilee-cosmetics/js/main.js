// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    cart.init();

    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            cart.showToast(`สมัครรับข่าวสารด้วยอีเมล ${email} เรียบร้อยแล้ว`);
            newsletterForm.reset();
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-add-to-cart]')) {
            const btn = e.target.closest('[data-add-to-cart]');
            const productId = parseInt(btn.getAttribute('data-add-to-cart'));
            cart.add(productId);
        }
    });
}