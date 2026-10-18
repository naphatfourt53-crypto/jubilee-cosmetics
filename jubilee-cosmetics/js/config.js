// Configuration for Jubilee Cosmetics
const CONFIG = {
    siteName: 'Jubilee Cosmetics',
    currency: 'THB',
    currencySymbol: '฿',
    language: 'th', // default language
    shipping: {
        freeThreshold: 2000,
        standardDays: '3-7 วันทำการ'
    },
    contact: {
        line: '@jubileecosmetics',
        phone: '02-123-4567',
        email: 'support@jubileecosmetics.com',
        hours: '09:00 - 18:00 น.'
    }
};

// Translation dictionary - TH/EN
const TRANSLATIONS = {
    th: {
        home: 'หน้าแรก',
        products: 'สินค้าทั้งหมด',
        categories: 'หมวดหมู่',
        about: 'เกี่ยวกับเรา',
        contact: 'ติดต่อเรา',
        cart: 'ตะกร้าสินค้า',
        account: 'บัญชีผู้ใช้',
        search: 'ค้นหา',
        close: 'ปิด',
        addToCart: 'เพิ่มลงตะกร้า',
        viewCart: 'ดูตะกร้า',
        checkout: 'ชำระเงิน',
        continueShopping: 'ช้อปต่อ',
        emptyCart: 'ตะกร้าสินค้าว่าง',
        login: 'เข้าสู่ระบบ',
        register: 'สมัครสมาชิก',
        logout: 'ออกจากระบบ',
        myAccount: 'บัญชีของฉัน',
        myOrders: 'คำสั่งซื้อของฉัน',
        wishlist: 'รายการโปรด',
        featured: 'แนะนำ',
        new: 'ใหม่',
        sale: 'ลดราคา',
        price: 'ราคา',
        quantity: 'จำนวน',
        total: 'รวม',
        subtotal: 'ยอดรวมสินค้า',
        shipping: 'ค่าจัดส่ง',
        tax: 'ภาษี',
        freeShipping: 'จัดส่งฟรี',
        securePayment: 'การชำระเงินที่ปลอดภัย',
        moneyBack: 'รับประกันคืนเงิน',
        support: 'ฝ่ายสนับสนุนลูกค้า',
        inStock: 'พร้อมส่ง',
        outOfStock: 'สินค้าหมด',
        allProducts: 'สินค้าทั้งหมด',
        productDetails: 'รายละเอียดสินค้า',
        relatedProducts: 'สินค้าที่เกี่ยวข้อง',
        adminDashboard: 'แผงควบคุมผู้ดูแลระบบ',
        adminProducts: 'จัดการสินค้า',
        adminOrders: 'จัดการคำสั่งซื้อ',
        adminCustomers: 'จัดการลูกค้า',
        adminSettings: 'การตั้งค่า',
        signIn: 'ลงชื่อเข้าใช้',
        createAccount: 'สร้างบัญชีใหม่',
        email: 'อีเมล',
        password: 'รหัสผ่าน',
        confirmPassword: 'ยืนยันรหัสผ่าน',
        fullName: 'ชื่อ-นามสกุล',
        phone: 'เบอร์โทรศัพท์',
        address: 'ที่อยู่',
        shippingInfo: 'ข้อมูลการจัดส่ง',
        paymentMethod: 'วิธีการชำระเงิน',
        orderSummary: 'สรุปรายการสั่งซื้อ',
        placeOrder: 'ยืนยันการสั่งซื้อ',
        orderSuccess: 'สั่งซื้อสำเร็จ!',
        orderNumber: 'หมายเลขคำสั่งซื้อ',
        orderDate: 'วันที่สั่งซื้อ',
        newsletter: 'รับข่าวสารและโปรโมชันก่อนใคร',
        subscribe: 'สมัครสมาชิก',
        copyright: '© 2026 Jubilee Cosmetics. All rights reserved.',
        promoBanner: '🎉 โปรโมชันพิเศษ ลดสูงสุด 40% สำหรับคอลเลกชันใหม่',
        heroTitle: 'เครื่องสำอางและเครื่องประดับพรีเมียม',
        heroSubtitle: 'คัดสรรอย่างพิถีพิถันสำหรับคุณโดยเฉพาะ สินค้าคุณภาพจากแบรนด์ชั้นนำ',
        shopAll: 'ช้อปสินค้าทั้งหมด',
        featuredCollection: 'คอลเลกชันแนะนำ',
        memberDiscount: 'สมัครสมาชิกวันนี้ รับส่วนลด 10%',
        memberDesc: 'สำหรับการสั่งซื้อครั้งแรก พร้อมสิทธิพิเศษสำหรับสมาชิก Jubilee Club',
        register: 'สมัครสมาชิก',
        securePayment: 'การชำระเงินที่ปลอดภัย',
        secureDesc: 'รองรับบัตรเครดิต พรอมเพย์ และการโอนเงิน',
        freeShipping: 'จัดส่งทั่วประเทศ',
        shippingDesc: 'จัดส่งภายใน 3-7 วันทำการ ฟรีค่าจัดส่งเมื่อซื้อครบ 2,000 บาท',
        quality: 'รับประกันคุณภาพ',
        qualityDesc: 'สินค้าแท้ 100% มีใบรับรองจากแบรนด์ผู้ผลิต',
        support: 'บริการลูกค้า',
        supportDesc: 'ติดต่อผ่าน LINE และอีเมล เวลา 09:00 - 18:00 น.',
        footerDesc: 'ร้านเครื่องสำอางและเครื่องประดับพรีเมียม คัดสรรสินค้าคุณภาพสำหรับคุณ',
        shop: 'ร้านค้า',
        customerService: 'บริการลูกค้า',
        about: 'เกี่ยวกับเรา',
        noResults: 'ไม่พบสินค้าที่คุณค้นหา'
    },
    en: {
        home: 'Home',
        products: 'All Products',
        categories: 'Categories',
        about: 'About Us',
        contact: 'Contact',
        cart: 'Shopping Cart',
        account: 'Account',
        search: 'Search',
        close: 'Close',
        addToCart: 'Add to Cart',
        viewCart: 'View Cart',
        checkout: 'Checkout',
        continueShopping: 'Continue Shopping',
        emptyCart: 'Your cart is empty',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        myAccount: 'My Account',
        myOrders: 'My Orders',
        wishlist: 'Wishlist',
        featured: 'Featured',
        new: 'New',
        sale: 'Sale',
        price: 'Price',
        quantity: 'Quantity',
        total: 'Total',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        tax: 'Tax',
        freeShipping: 'Free Shipping',
        securePayment: 'Secure Payment',
        moneyBack: 'Money Back Guarantee',
        support: 'Customer Support',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        allProducts: 'All Products',
        productDetails: 'Product Details',
        relatedProducts: 'Related Products',
        adminDashboard: 'Admin Dashboard',
        adminProducts: 'Manage Products',
        adminOrders: 'Manage Orders',
        adminCustomers: 'Manage Customers',
        adminSettings: 'Settings',
        signIn: 'Sign In',
        createAccount: 'Create Account',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        fullName: 'Full Name',
        phone: 'Phone Number',
        address: 'Address',
        shippingInfo: 'Shipping Information',
        paymentMethod: 'Payment Method',
        orderSummary: 'Order Summary',
        placeOrder: 'Place Order',
        orderSuccess: 'Order Placed Successfully!',
        orderNumber: 'Order Number',
        orderDate: 'Order Date',
        newsletter: 'Get news & promotions first',
        subscribe: 'Subscribe',
        copyright: '© 2026 Jubilee Cosmetics. All rights reserved.',
        promoBanner: '🎉 Special Promotion Up to 40% Off New Collection',
        heroTitle: 'Premium Cosmetics and Jewelry',
        heroSubtitle: 'Carefully selected for you Quality products from leading brands',
        shopAll: 'Shop All Products',
        featuredCollection: 'Featured Collection',
        memberDiscount: 'Register today Get 10% discount',
        memberDesc: 'For first purchase Plus special privileges for Jubilee Club members',
        register: 'Register',
        securePayment: 'Secure Payment',
        secureDesc: 'Supports credit cards PromptPay and bank transfers',
        freeShipping: 'Nationwide Shipping',
        shippingDesc: 'Ships within 3-7 business days Free shipping on orders over 2,000 THB',
        quality: 'Quality Guarantee',
        qualityDesc: '100% genuine products With certification from manufacturers',
        support: 'Customer Support',
        supportDesc: 'Contact via LINE and Email 09:00 - 18:00',
        footerDesc: 'Premium cosmetics and jewelry store Curating quality products for you',
        shop: 'Shop',
        customerService: 'Customer Service',
        about: 'About Us',
        noResults: 'No products found matching your search'
    }
};

// Set language and update all translatable elements
function setLanguage(lang) {
    CONFIG.language = lang;
    
    // Update active state on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update all elements with data-t attribute
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });

    // Update page title if it has data-t-title
    const titleEl = document.querySelector('[data-t-title]');
    if (titleEl && TRANSLATIONS[lang] && TRANSLATIONS[lang][titleEl.getAttribute('data-t-title')]) {
        document.title = TRANSLATIONS[lang][titleEl.getAttribute('data-t-title')] + ' | Jubilee Cosmetics';
    }

    // Re-render cart if open
    if (typeof cart !== 'undefined' && document.getElementById('cartDrawer')?.classList.contains('open')) {
        cart.renderCart();
    }

    // Re-render products page if on products.html
    if (typeof renderProducts === 'function') {
        renderProducts();
    }
}

function t(key) {
    return TRANSLATIONS[CONFIG.language][key] || key;
}

// Initialize language from URL param or default
function initLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && TRANSLATIONS[langParam]) {
        setLanguage(langParam);
    }
}