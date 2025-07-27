// DOM elementleri
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartItemCount = document.getElementById('cartItemCount'); // Header'daki sepet ikonu üzerindeki sayı
const subtotalElement = document.getElementById('subtotal');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// Auth Modal Elementleri (eğer market.html'de de varsa ve kullanılacaksa)
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const goToRegister = document.getElementById('goToRegister');
const goToLogin = document.getElementById('goToLogin');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');
const profileBtn = document.getElementById('profileBtn'); // Header'daki profil butonu


// Sepet verilerini al (sessionStorage'dan)
// Bu fonksiyon women.js'deki addToCart'ın kaydettiği formatla uyumlu olmalı.
function getCartItems() {
    const cart = sessionStorage.getItem('cartItems');
    if (!cart) return [];
    try {
        // JSON.parse işleminden sonra number/float dönüşümlerini garanti altına al
        return JSON.parse(cart).map(item => ({
            ...item,
            // ID'yi her zaman number olarak tut
            id: typeof item.id === 'string' && !isNaN(Number(item.id)) ? Number(item.id) : item.id,
            price: parseFloat(item.price),
            quantity: Number(item.quantity)
        }));
    } catch (e) {
        console.error("Sepet verileri parse edilirken hata oluştu:", e);
        return [];
    }
}

// Sepeti sessionStorage'a kaydet
function saveCartItems(cartItems) {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Sepet öğelerini DOM'da göster/güncelle
function renderCartItems() {
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Sepetiniz Boş</h3>
                <p>Sepetinizde hiç ürün bulunmamaktadır. Hemen alışverişe başlamak için aşağıdaki butonu kullanabilirsiniz.</p>
                <a href="index.html" class="continue-shopping">Alışverişe Devam Et</a>
            </div>`;
        updateCartBadge();
        updateCartSummary();
        return;
    }

    cartItemsContainer.innerHTML = ''; // Sepeti baştan çizmek yerine mevcut öğeleri güncellemek daha performanslıdır
    // Ancak basitlik için şimdilik tamamen yeniden çiziyoruz.
    // Daha gelişmiş bir yapı için DOM diffing veya sadece değişen öğeleri güncelleme düşünebilirsin.

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.setAttribute('data-product-id', item.id); // productId'yi data attribute olarak sakla

        itemDiv.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="cart-item-price">₺${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-qty" data-id="${item.id}" data-change="-1">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-qty" data-id="${item.id}" data-change="1">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i> Kaldır
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Yeni eklenen veya varolan butonlara olay dinleyicilerini ata
    attachCartItemEventListeners();
    updateCartBadge();
    updateCartSummary();
}

// Sepet öğelerindeki butonlara olay dinleyicileri ata
function attachCartItemEventListeners() {
    // Miktar azaltma butonları
    document.querySelectorAll('.quantity-btn.decrease-qty').forEach(button => {
        // Her tıklandığında birden fazla dinleyici eklenmesini önlemek için önceki dinleyiciyi kaldır
        button.removeEventListener('click', handleQuantityChange);
        button.addEventListener('click', handleQuantityChange);
    });

    // Miktar artırma butonları
    document.querySelectorAll('.quantity-btn.increase-qty').forEach(button => {
        button.removeEventListener('click', handleQuantityChange);
        button.addEventListener('click', handleQuantityChange);
    });

    // Kaldır butonları
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.removeEventListener('click', handleRemoveItem);
        button.addEventListener('click', handleRemoveItem);
    });
}

// Miktar değiştirme olay işleyicisi
function handleQuantityChange(event) {
    const button = event.currentTarget;
    const itemId = button.dataset.id; // data-id string olarak gelir
    const change = Number(button.dataset.change); // data-change string olarak gelir, Number'a çevir

    let cartItems = getCartItems();
    const itemIndex = cartItems.findIndex(item => String(item.id) === String(itemId)); // ID'leri string olarak karşılaştır

    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += change;

        if (cartItems[itemIndex].quantity <= 0) {
            // Miktar 0 veya altına düşerse ürünü tamamen kaldır
            removeItem(itemId);
        } else {
            // Sadece ilgili öğenin miktarını DOM'da güncelle
            const quantitySpan = button.closest('.cart-item-quantity').querySelector('.quantity-value');
            if (quantitySpan) {
                quantitySpan.textContent = cartItems[itemIndex].quantity;
            }
            saveCartItems(cartItems);
            updateCartBadge();
            updateCartSummary();
        }
    }
}


// Ürün kaldırma olay işleyicisi
function handleRemoveItem(event) {
    const button = event.currentTarget;
    const itemId = button.dataset.id; // data-id string olarak gelir
    removeItem(itemId);
}


// Sepetten bir öğeyi kaldıran ana fonksiyon
function removeItem(itemId) {
    let cartItems = getCartItems();
    const initialLength = cartItems.length; // Kontrol için başlangıç uzunluğu

    // ID'leri string olarak karşılaştırarak doğru ürünü filtrele
    cartItems = cartItems.filter(item => String(item.id) !== String(itemId));

    if (cartItems.length < initialLength) { // Eğer bir ürün gerçekten kaldırıldıysa
        saveCartItems(cartItems);

        // Sadece kaldırılan öğeyi DOM'dan sil
        const itemToRemove = document.querySelector(`.cart-item[data-product-id="${itemId}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
        }

        // Eğer sepet boşaldıysa "Sepetiniz Boş" mesajını göster
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Sepetiniz Boş</h3>
                    <p>Sepetinizde hiç ürün bulunmamaktadır. Hemen alışverişe başlamak için aşağıdaki butonu kullanabilirsiniz.</p>
                    <a href="index.html" class="continue-shopping">Alışverişe Devam Et</a>
                </div>`;
        }

        updateCartBadge();
        updateCartSummary();
        console.log(`Ürün ID: ${itemId} sepetten silindi.`);
    } else {
        console.log(`Ürün ID: ${itemId} sepette bulunamadı.`);
    }
}


// Sepet özetini güncelle (Ara toplam ve Toplam fiyat)
function updateCartSummary() {
    const cartItems = getCartItems();
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 19.99 : 0; // Sepette ürün varsa kargo ücreti
    const total = subtotal + shipping;

    // Elementlerin varlığını kontrol et
    if (subtotalElement) {
        subtotalElement.textContent = `₺${subtotal.toFixed(2)}`;
    }
    if (totalPriceElement) {
        totalPriceElement.textContent = `₺${total.toFixed(2)}`;
    }
}

// Header'daki sepet rozetini güncelle
function updateCartBadge() {
    const cartItems = getCartItems();
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    // Eğer cartItemCount elementi varsa güncelle (women.js'de de bu eleman olabilir, çakışmamalı)
    if (cartItemCount) {
        cartItemCount.textContent = totalQuantity;
    }
    // women.js'deki cartBadge'i de güncellemek için buraya ek bir çağrı yapılabilir
    // Örneğin: if (window.updateMainCartBadge) window.updateMainCartBadge();
}


// Modal işlemleri (Eğer market.html'de de giriş/kayıt modalı varsa)
function showAuthModal() {
    if (authModal) { // authModal var mı kontrol et
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    if (authModal) { // authModal var mı kontrol et
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Modalı kapatırken mesajları ve formları temizle
        if (loginMessage) loginMessage.textContent = '';
        if (registerMessage) registerMessage.textContent = '';
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
    }
}

function goToRegisterForm() {
    if (loginTab) loginTab.classList.remove('active');
    if (registerTab) registerTab.classList.add('active');
    if (loginForm) loginForm.classList.remove('active');
    if (registerForm) registerForm.classList.add('active');
    // Tab değişince mesajları temizle
    if (loginMessage) loginMessage.textContent = '';
    if (registerMessage) registerMessage.textContent = '';
}

function goToLoginForm() {
    if (registerTab) registerTab.classList.remove('active');
    if (loginTab) loginTab.classList.add('active');
    if (registerForm) registerForm.classList.remove('active');
    if (loginForm) loginForm.classList.add('active');
    // Tab değişince mesajları temizle
    if (loginMessage) loginMessage.textContent = '';
    if (registerMessage) registerMessage.textContent = '';
}

// Modal butonları event listenerları
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        showAuthModal();
        goToLoginForm(); // Profil butonuna tıklayınca varsayılan olarak giriş sekmesini aç
    });
}
if (checkoutBtn) { // checkoutBtn var mı kontrol et
    checkoutBtn.addEventListener('click', showAuthModal);
}
if (closeModal) { // closeModal var mı kontrol et
    closeModal.addEventListener('click', closeAuthModal);
}
if (goToRegister) { // goToRegister var mı kontrol et
    goToRegister.addEventListener('click', e => {
        e.preventDefault();
        goToRegisterForm();
    });
}
if (goToLogin) { // goToLogin var mı kontrol et
    goToLogin.addEventListener('click', e => {
        e.preventDefault();
        goToLoginForm();
    });
}
if (loginTab) { // loginTab var mı kontrol et
    loginTab.addEventListener('click', goToLoginForm);
}
if (registerTab) { // registerTab var mı kontrol et
    registerTab.addEventListener('click', goToRegisterForm);
}
window.addEventListener('click', e => {
    if (e.target === authModal) closeAuthModal();
});


// Yardımcı Fonksiyon: Mesajları Göster ve Biçimlendir
function showMessage(element, message, type) {
    if (!element) return; // Element yoksa hata vermeden çık

    element.textContent = message;
    element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'hidden');
    element.classList.add('mt-3', 'text-center', 'text-lg', 'font-semibold');

    if (type === 'success') {
        element.classList.add('text-green-500');
    } else if (type === 'error') {
        element.classList.add('text-red-500');
    } else if (type === 'info') {
        element.classList.add('text-yellow-500');
    }

    setTimeout(() => {
        element.textContent = '';
        element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500');
    }, 4000);
}


// Giriş Formu Gönderimi İşleyicisi
if (loginForm) { // loginForm var mı kontrol et
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (loginMessage) {
            loginMessage.textContent = '';
            loginMessage.style.color = 'red';
        }

        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');

        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value.trim() : '';

        if (!email || !password) {
            showMessage(loginMessage, 'Lütfen e-posta ve şifre girin.', 'error');
            return;
        }

        showMessage(loginMessage, 'Giriş yapılıyor...', 'info');

        try {
            const res = await fetch('login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });
            const result = await res.json();

            if (result.status === 'success') {
                showMessage(loginMessage, result.message || 'Giriş başarılı!', 'success');
                if (loginForm) loginForm.reset();
                setTimeout(() => window.location.href = 'index.php', 2000);
            } else {
                showMessage(loginMessage, result.message || 'Giriş başarısız.', 'error');
            }
        } catch (err) {
            showMessage(loginMessage, 'Sunucu hatası.', 'error');
            console.error(err);
        }
    });
}


// Kayıt Formu Gönderimi İşleyicisi
if (registerForm) { // registerForm var mı kontrol et
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (registerMessage) {
            registerMessage.textContent = '';
            registerMessage.style.color = 'red';
        }

        const nameInput = document.getElementById('registerName');
        const emailInput = document.getElementById('registerEmail');
        const passwordInput = document.getElementById('registerPassword');
        const confirmInput = document.getElementById('registerConfirm');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value.trim() : '';
        const confirm = confirmInput ? confirmInput.value.trim() : '';

        if (!name || !email || !password || !confirm) {
            showMessage(registerMessage, 'Lütfen tüm alanları doldurun.', 'error');
            return;
        }
        if (password.length < 6) {
            showMessage(registerMessage, 'Şifre en az 6 karakter olmalı.', 'error');
            return;
        }
        if (password !== confirm) {
            showMessage(registerMessage, 'Şifreler eşleşmiyor.', 'error');
            return;
        }

        showMessage(registerMessage, 'Hesap oluşturuluyor...', 'info');

        try {
            const res = await fetch('register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirm=${encodeURIComponent(confirm)}`
            });
            const result = await res.json();

            if (result.status === 'success') {
                showMessage(registerMessage, result.message || 'Kayıt başarılı!', 'success');
                if (registerForm) registerForm.reset();
                setTimeout(() => {
                    goToLoginForm(); // Otomatik olarak giriş sekmesine geç
                    if (registerMessage) registerMessage.textContent = ''; // Mesajı temizle
                }, 1500);
            } else {
                showMessage(registerMessage, result.message || 'Kayıt başarısız.', 'error');
            }
        } catch (err) {
            showMessage(registerMessage, 'Sunucu hatası.', 'error');
            console.error(err);
        }
    });
}


// Sayfa yüklendiğinde sepeti render et ve özeti güncelle
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); // Sepet öğelerini DOM'a render et
    // updateCartBadge() ve updateCartSummary() renderCartItems() içinde zaten çağrılıyor
});