// Product data for Jubilee Cosmetics
const PRODUCTS = [
    {
        id: 1,
        name: 'ต่างหูเพชร Atelier Eterna Stud',
        nameEn: 'Atelier Eterna Stud Earrings',
        category: 'earrings',
        price: 26500,
        salePrice: 15900,
        discount: 40,
        image: 'assets/earring-stud.svg',
        description: 'ต่างหูเพชรแท้ ดีไซน์เรียบหรู สำหรับทุกโอกาส',
        descriptionEn: 'Genuine diamond stud earrings, elegant design for every occasion',
        inStock: true,
        featured: true,
        rating: 5,
        reviews: 128
    },
    {
        id: 2,
        name: 'ต่างหูเพชร Atelier Sweet Dance',
        nameEn: 'Atelier Sweet Dance Earrings',
        category: 'earrings',
        price: 26500,
        salePrice: 15900,
        discount: 40,
        image: 'assets/earring-dance.svg',
        description: 'ต่างหูเพชรดีไซน์เต้นระบำ แวววาวทุกการเคลื่อนไหว',
        descriptionEn: 'Dance-inspired diamond earrings, sparkling with every movement',
        inStock: true,
        featured: true,
        rating: 4.8,
        reviews: 94
    },
    {
        id: 3,
        name: 'ต่างหูเพชรทรงกลม Classic',
        nameEn: 'Classic Round Diamond Earrings',
        category: 'earrings',
        price: 18500,
        salePrice: null,
        discount: null,
        image: 'assets/earring-classic.svg',
        description: 'ต่างหูเพชรทรงกลมคลาสสิก ใส่ได้ทุกวัน',
        descriptionEn: 'Classic round diamond earrings, perfect for daily wear',
        inStock: true,
        featured: false,
        rating: 4.9,
        reviews: 210
    },
    {
        id: 4,
        name: 'สร้อยคอเพชรหยก Jubilee',
        nameEn: 'Jubilee Jade Diamond Necklace',
        category: 'necklaces',
        price: 45000,
        salePrice: 32000,
        discount: 29,
        image: 'assets/necklace-jubilee.svg',
        description: 'สร้อยคอเพชรประดับหยก แหวนนำโชคจาก Jubilee',
        descriptionEn: 'Diamond jade pendant necklace, lucky charm from Jubilee',
        inStock: true,
        featured: true,
        rating: 5,
        reviews: 67
    },
    {
        id: 5,
        name: 'กำไลข้อมือเพชร Tennis',
        nameEn: 'Diamond Tennis Bracelet',
        category: 'bracelets',
        price: 55000,
        salePrice: 39500,
        discount: 28,
        image: 'assets/bracelet-tennis.svg',
        description: 'กำไลข้อมือเพชรแบบเทนนิส ประกายระยับระยับ',
        descriptionEn: 'Diamond tennis bracelet, sparkling and elegant',
        inStock: true,
        featured: true,
        rating: 4.7,
        reviews: 156
    },
    {
        id: 6,
        name: 'แหวนเพชร Engagement Solitaire',
        nameEn: 'Solitaire Diamond Engagement Ring',
        category: 'rings',
        price: 85000,
        salePrice: null,
        discount: null,
        image: 'assets/ring-solitaire.svg',
        description: 'แหวนหมั้นเพชรเม็ดเดี่ยว งานฝีมือประณีต',
        descriptionEn: 'Solitaire diamond engagement ring, exquisite craftsmanship',
        inStock: true,
        featured: false,
        rating: 5,
        reviews: 89
    },
    {
        id: 7,
        name: 'ลิปสติกแมท Dior Rouge',
        nameEn: 'Dior Rouge Matte Lipstick',
        category: 'makeup',
        price: 1450,
        salePrice: 1150,
        discount: 21,
        image: 'assets/lipstick-dior.svg',
        description: 'ลิปสติกแมทจาก Dior สีสันสดชื่น ติดทนนาน',
        descriptionEn: 'Dior matte lipstick, vibrant color, long-lasting',
        inStock: true,
        featured: true,
        rating: 4.6,
        reviews: 342
    },
    {
        id: 8,
        name: 'ครีมบำรุงผิว La Mer',
        nameEn: 'La Mer Moisturizing Cream',
        category: 'skincare',
        price: 6800,
        salePrice: 5200,
        discount: 24,
        image: 'assets/cream-lamer.svg',
        description: 'ครีมบำรุงผิวหน้าระดับพรีเมียม ฟื้นฟูผิวให้ชุ่มชื่น',
        descriptionEn: 'Premium face moisturizing cream, restores hydration',
        inStock: true,
        featured: false,
        rating: 4.9,
        reviews: 178
    }
];

function getFeaturedProducts() {
    return PRODUCTS.filter(p => p.featured);
}

function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
    if (category === 'all' || !category) return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

function searchProducts(query) {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.nameEn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
}