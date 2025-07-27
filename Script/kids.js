// men.js dosyası başarıyla yüklendi ve çalışıyor!
console.log("men.js dosyası başarıyla yüklendi ve çalışıyor!");

// Modal ve Formlar DOM Elementleri
const authModal = document.getElementById('authModal');
const profileBtn = document.getElementById('profileBtn');
const closeModal = document.getElementById('closeModal');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const goToRegister = document.getElementById('goToRegister');
const goToLogin = document.getElementById('goToLogin');

// Sepet rozeti ve favori rozetini DOM'dan al
// Sepet rozetinin id'si olmadığından nextElementSibling kullanıldı, daha sağlam olması için id vermek daha iyi olur.
const cartBadge = document.querySelector('.header-icons .fa-shopping-cart').nextElementSibling; // Sepet rozeti span'ı
const favoriteBadge = document.querySelector('header .fa-heart').nextElementSibling; // Favori rozeti span'ı

// Favori Giriş Modalı Elementleri
// Eğer HTML'de yoksa, aşağıdaki HTML yapısını men.html'deki authModal'ın altına eklemelisiniz.
/*
<div class="auth-modal" id="favoriteLoginModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Favorilere Ekle</h2>
            <button class="close-modal" id="closeFavoriteModal">&times;</button>
        </div>
        <div class="modal-body">
            <p style="text-align: center; margin-bottom: 20px;">Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.</p>
            <div style="display: flex; justify-content: space-around;">
                <button class="submit-btn" id="favoriteGoToLogin" style="width: 45%;">Giriş Yap</button>
                <button class="submit-btn" id="favoriteGoToRegister" style="width: 45%;">Kayıt Ol</button>
            </div>
        </div>
    </div>
</div>
*/
const favoriteLoginModal = document.getElementById('favoriteLoginModal');
const closeFavoriteModal = document.getElementById('closeFavoriteModal');
const favoriteGoToLogin = document.getElementById('favoriteGoToLogin');
const favoriteGoToRegister = document.getElementById('favoriteGoToRegister');


// Mesaj Kutusu Elementleri
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');


// Sayfa yüklendiğinde sepet sayısını sessionStorage'dan al, yoksa 0 yap
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge(); // Sepet rozetini güncelle
    // Header'daki kalp ikonunun span'ını kaldır (Bu satır orijinal kodunuzda da vardı, sanırım favori sayısı göstermek istemiyorsunuz)
    // Eğer favori sayısını göstermek istiyorsanız bu satırı yorum satırı yapın veya silin.
    if (favoriteBadge) { // favoriteBadge'in varlığını kontrol et
        favoriteBadge.remove();
    }
});


// Yardımcı Fonksiyon: Mesajları Göster ve Biçimlendir
function showMessage(element, message, type) {
    element.textContent = message;
    // Önceki renk sınıflarını temizle
    element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'hidden');
    // Temel stil sınıflarını ekle (Bunlar HTML'deki div'lerde zaten var ama emin olmak için)
    element.classList.add('mt-3', 'text-center', 'text-lg', 'font-semibold');

    // Mesaj tipine göre renk sınıfı ekle
    if (type === 'success') {
        element.classList.add('text-green-500');
    } else if (type === 'error') {
        element.classList.add('text-red-500');
    } else if (type === 'info') {
        element.classList.add('text-yellow-500'); // Yükleniyor veya bilgi mesajları için
    }

    // Mesajı 4 saniye (4000 ms) sonra temizle
    setTimeout(() => {
        element.textContent = '';
        element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500');
    }, 4000);
}


// Ana Giriş/Kayıt Modal Açma Olayı
profileBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Sayfayı kaydırmayı engelle
});

// Ana Giriş/Kayıt Modal Kapatma Olayı
closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Sayfayı kaydırmayı tekrar etkinleştir
    // Modalı kapatırken mesajları ve formları temizle
    loginMessage.textContent = '';
    registerMessage.textContent = '';
    loginForm.reset();
    registerForm.reset();
});

// Ana Giriş/Kayıt Modal Dışına Tıklayınca Kapatma Olayı
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Modalı kapatırken mesajları ve formları temizle
        loginMessage.textContent = '';
        registerMessage.textContent = '';
        loginForm.reset();
        registerForm.reset();
    }
});

// Favori Giriş Modal Kapatma Olayı
if (closeFavoriteModal) { // Elementin varlığını kontrol et
    closeFavoriteModal.addEventListener('click', () => {
        favoriteLoginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}


// Favori Giriş Modal Dışına Tıklayınca Kapatma Olayı
window.addEventListener('click', (e) => {
    if (e.target === favoriteLoginModal && favoriteLoginModal) { // favoriteLoginModal'ın varlığını da kontrol et
        favoriteLoginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


// Giriş ve Kayıt Sekmeleri Arası Geçişler
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    // Tab değişince mesajları temizle
    loginMessage.textContent = '';
    registerMessage.textContent = '';
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    // Tab değişince mesajları temizle
    loginMessage.textContent = '';
    registerMessage.textContent = '';
});

// 'Hemen Kayıt Ol' Linki
goToRegister.addEventListener('click', (e) => {
    e.preventDefault(); // Varsayılan link davranışını engelle
    registerTab.click(); // Kayıt sekmesini simüle et
});

// 'Zaten Hesabım Var' Linki
goToLogin.addEventListener('click', (e) => {
    e.preventDefault(); // Varsayılan link davranışını engelle
    loginTab.click(); // Giriş sekmesini simüle et
});

// Favori modalındaki Giriş Yap butonu
if (favoriteGoToLogin) { // Elementin varlığını kontrol et
    favoriteGoToLogin.addEventListener('click', () => {
        if (favoriteLoginModal) favoriteLoginModal.style.display = 'none'; // Favori modalını kapat
        authModal.style.display = 'flex'; // Ana giriş modalını aç
        loginTab.click(); // Giriş sekmesini aktifleştir
        document.body.style.overflow = 'hidden';
    });
}


// Favori modalındaki Kayıt Ol butonu
if (favoriteGoToRegister) { // Elementin varlığını kontrol et
    favoriteGoToRegister.addEventListener('click', () => {
        if (favoriteLoginModal) favoriteLoginModal.style.display = 'none'; // Favori modalını kapat
        authModal.style.display = 'flex'; // Ana giriş modalını aç
        registerTab.click(); // Kayıt sekmesini aktifleştir
        document.body.style.overflow = 'hidden';
    });
}


// Giriş Formu Gönderimi İşleyicisi
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Formun varsayılan submit davranışını engelle

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Frontend Doğrulama: Boş alan kontrolü
    if (!email || !password) {
        showMessage(loginMessage, 'Lütfen e-posta ve şifrenizi girin.', 'error');
        return; // Hata varsa burada dur
    }

    showMessage(loginMessage, 'Giriş yapılıyor...', 'info'); // Yükleniyor mesajı göster

    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        // Not: login.php ve register.php dosyalarınızın sunucunuzda mevcut ve doğru çalıştığından emin olun.
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json(); // PHP'den gelen JSON yanıtını bekle

        if (data.status === 'success') {
            showMessage(loginMessage, 'Giriş başarılı, yönlendiriliyorsunuz...', 'success');
            loginForm.reset(); // Formu temizle
            // 2 saniye bekle sonra ana sayfaya yönlendir
            setTimeout(() => {
                window.location.href = 'index.php'; // Giriş başarılıysa yönlendirme
            }, 2000);
        } else {
            showMessage(loginMessage, data.message, 'error'); // PHP'den gelen hata mesajını göster
        }
    } catch (err) {
        // Ağ hatası veya sunucuya ulaşılamaması durumu
        showMessage(loginMessage, "Bir hata oluştu, lütfen tekrar deneyin.", 'error');
        console.error('Login Hatası:', err); // Konsola detayı yazdır
    }
});

// Kayıt Formu Gönderimi İşleyicisi
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Formun varsayılan submit davranışını engelle

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirm').value.trim();

    // Frontend Doğrulama: Tüm alanlar dolu mu?
    if (!name || !email || !password || !confirmPassword) {
        showMessage(registerMessage, 'Lütfen tüm alanları doldurun.', 'error');
        return;
    }

    // Frontend Doğrulama: Şifre uzunluğu
    if (password.length < 6) {
        showMessage(registerMessage, 'Şifre en az 6 karakter olmalıdır.', 'error');
        return;
    }

    // Frontend Doğrulama: Şifreler eşleşiyor mu?
    if (password !== confirmPassword) {
        showMessage(registerMessage, 'Şifreler eşleşmiyor.', 'error');
        return;
    }

    showMessage(registerMessage, 'Hesap oluşturuluyor...', 'info'); // Yükleniyor mesajı göster

    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirm', confirmPassword);

        // Not: login.php ve register.php dosyalarınızın sunucunuzda mevcut ve doğru çalıştığından emin olun.
        const response = await fetch('register.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json(); // PHP'den gelen JSON yanıtını bekle

        if (data.status === 'success') {
            showMessage(registerMessage, data.message, 'success');
            registerForm.reset(); // Kayıt formunu temizle

            setTimeout(() => {
                loginTab.click(); // Otomatik olarak giriş sekmesine geç
            }, 2000); // 2 saniye sonra
        } else {
            showMessage(registerMessage, data.message, 'error'); // PHP'den gelen hata mesajını göster
        }
    } catch (err) {
        // Ağ hatası veya sunucuya ulaşılamaması durumu
        showMessage(registerMessage, "Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin.", 'error');
        console.error('Kayıt Hatası:', err); // Konsola detayı yazdır
    }
});


// Ziyaretçi Sayacı (Bu kısım, sadece men.html'de 'visitorCount' ID'li bir element varsa çalışır.)
document.addEventListener('DOMContentLoaded', function () {
    const counterElement = document.getElementById('visitorCount');
    if (counterElement) { // Eğer 'visitorCount' elementi varsa çalıştır
        let count = localStorage.getItem('visitorCount');
        if (!count) {
            count = Math.floor(Math.random() * 1000) + 5000; // İlk kez açılıyorsa rastgele başlangıç
        } else {
            count = parseInt(count);
        }

        count++;
        localStorage.setItem('visitorCount', count); // Sayacı güncelle ve kaydet

        let current = 0;
        const increment = Math.ceil(count / 100); // Animasyon için artış miktarı

        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer); // Hedefe ulaşınca durdur
            }
            counterElement.textContent = current.toLocaleString(); // Sayıyı formatlayarak göster
        }, 20); // Her 20ms'de bir güncelle
    }
});


// Sepete Ekle Butonları İşleyicisi
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const productCard = this.closest('.product-card');
        // data-product-id yoksa productName'den türet, varsa direkt kullan
        const productId = productCard.getAttribute('data-product-id') || productCard.querySelector('h3').textContent.replace(/\s/g, '-').toLowerCase();
        const productName = productCard.querySelector('h3').textContent;
        const productPriceText = productCard.querySelector('.price .current').textContent;
        const productPrice = parseFloat(productPriceText.replace('₺', '').replace(',', '.'));
        const productImage = productCard.querySelector('.product-img img').src;

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        addToCart(product); // Ürünü sepete ekle veya miktarını artır
        updateCartBadge(); // Sepet rozetini güncelle

        const originalText = this.textContent;
        this.textContent = "Sepete Eklendi!";
        this.style.backgroundColor = '#5cb85c';

        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
    });
});

// Sepete ürün ekleme veya miktarını artırma fonksiyonu
function addToCart(product) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cartItems[existingProductIndex].quantity++;
    } else {
        cartItems.push(product);
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Sepetteki ürün miktarını artırma fonksiyonu
function increaseQuantity(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const productIndex = cartItems.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        cartItems[productIndex].quantity++;
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartBadge();
        // Bu kısım, sepet UI'ını (market.html gibi) güncellemek için çağrılmalı
        // Eğer bu JS dosyası market.html'de de kullanılıyorsa ve sepet öğeleri render ediliyorsa,
        // buraya updateCartUI() veya renderCartItems() gibi bir çağrı eklenebilir.
        // updateCartUI(); // Sepet detay sayfasındaki UI'ı güncellemek için
    }
}

// Sepetteki ürün miktarını azaltma fonksiyonu
function decreaseQuantity(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const productIndex = cartItems.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (cartItems[productIndex].quantity > 1) {
            cartItems[productIndex].quantity--;
        } else {
            // Eğer miktar 1 ise, ürünü tamamen sepetten kaldır
            cartItems.splice(productIndex, 1);
        }
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartBadge();
        // Bu kısım, sepet UI'ını (market.html gibi) güncellemek için çağrılmalı
        // updateCartUI(); // Sepet detay sayfasındaki UI'ı güncellemek için
    }
}

// Sepetten ürünü tamamen silme fonksiyonu
function removeProductFromCart(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const initialLength = cartItems.length;
    cartItems = cartItems.filter(item => item.id !== productId); // Silinecek ürünü filtrele

    if (cartItems.length < initialLength) { // Ürün gerçekten silindiyse
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartBadge();
        // Bu kısım, sepet UI'ını (market.html gibi) güncellemek için çağrılmalı
        // updateCartUI(); // Sepet detay sayfasındaki UI'ı güncellemek için
        console.log(`Ürün ID: ${productId} sepetten silindi.`);
    } else {
        console.log(`Ürün ID: ${productId} sepette bulunamadı.`);
    }
}


// Sepet rozetini güncelleme fonksiyonu
function updateCartBadge() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    // Sepet rozeti, sepetteki toplam ürün sayısını göstermelidir (farklı ürün sayısı değil)
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
}


// Favori ikonları işleyicisi (Kalp ikonuna tıklayınca giriş/kayıt modalını açma)
const favoriteIcons = document.querySelectorAll('.favorite-icon');
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        // Favorilere ürün eklemek için lütfen giriş yapın mesajını göster
        if (favoriteLoginModal) { // Favori modalının varlığını kontrol et
            favoriteLoginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            // Favori modalındaki mesajı ayarla
            favoriteLoginModal.querySelector('.modal-body p').textContent = 'Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.';
        } else {
            // Eğer favori modalı HTML'de yoksa, doğrudan ana giriş modalını açabiliriz
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            loginTab.click(); // Giriş sekmesini aktifleştir
            showMessage(loginMessage, 'Favorilere ürün eklemek için lütfen giriş yapın.', 'info');
        }
    });
});


// Hızlı Görüntüleme (Quick View) İşleyicisi
const quickViewElements = document.querySelectorAll('.quick-view');
quickViewElements.forEach(el => {
    el.addEventListener('click', function () {
        const productCard = this.closest('.product-card'); // Ürün kartını bul
        const productName = productCard.querySelector('h3').textContent; // Ürün adını al
        alert(`${productName} ürününü detaylı incelemek için yakında açılacak olan ürün sayfasını kullanabilirsiniz!`);
    });
});