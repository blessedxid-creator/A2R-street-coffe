/**
 * JavaScript Logika Interaktif - A2R Street Coffee
 */

// 1. Router Mulus untuk SPA (Single Page Application)
function navigateTo(targetId) {
    // Sembunyikan semua section halaman terlebih dahulu
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Tampilkan target section halaman yang dipilih
    const activePage = document.getElementById('page-' + targetId);
    if (activePage) {
        activePage.classList.add('active');
    }

    // Mengatur indikator aktif pada navigasi bar (Desktop & Mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-coffee-500');
        link.classList.add('text-stone-400');
    });

    const activeLink = document.getElementById('nav-' + targetId);
    if (activeLink) {
        activeLink.classList.remove('text-stone-400');
        activeLink.classList.add('text-coffee-500');
    }

    // Gulirkan browser otomatis ke bagian paling atas dengan efek halus (smooth)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Tutup menu drawer mobile secara otomatis setelah navigasi diklik
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

// 2. Toggle Buka/Tutup Hamburger Menu di Mobile View
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
}

// 3. Sistem Filter Kategori Menu Dinamis
function filterMenu(category) {
    // Atur gaya status tombol filter yang sedang aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-coffee-500', 'text-coffee-950');
        btn.classList.add('bg-stone-900', 'border-stone-850', 'text-stone-300');
    });

    const activeBtn = document.getElementById('btn-' + category);
    if (activeBtn) {
        activeBtn.classList.remove('bg-stone-900', 'border-stone-850', 'text-stone-300');
        activeBtn.classList.add('bg-coffee-500', 'text-coffee-950');
    }

    // Menyaring item menu berdasarkan atribut 'data-category'
    document.querySelectorAll('.menu-card').forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Integrasi Pemesanan via WhatsApp Otomatis
function orderViaWA(itemName) {
    const phoneNumber = '6281413036090'; // Silakan ubah menjadi nomor WhatsApp bisnis Anda
    const message = `Halo A2R Street Coffee! Saya mau pesan menu: *${itemName}*.\n\nMohon informasi tata cara pembayarannya ya. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// 5. Inisialisasi awal saat halaman dimuat pertama kali
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);

    // Cegah error jika hash tidak sesuai dengan id halaman yang sah
    if (hash === 'menu' || hash === 'about') {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
});