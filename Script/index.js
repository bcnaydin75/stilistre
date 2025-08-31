// index.js dosyası başarıyla yüklendi ve çalışıyor!
console.log("index.js dosyası başarıyla yüklendi ve çalışıyor!");

// --- Fiyat parse etme fonksiyonu ---
function parsePrice(priceText) {
    if (!priceText) return 0;
    let cleanText = priceText.replace('₺', '').trim();

    if (cleanText.includes(',')) {
        cleanText = cleanText.replace(/\./g, '');
        cleanText = cleanText.replace(',', '.');
    }

    const price = parseFloat(cleanText);
    return isNaN(price) ? 0 : price;
}


// --- Modal ve Formlar DOM Elementleri ---
const authModal = document.getElementById('authModal');
const profileBtn = document.getElementById('profileBtn');
const closeModal = document.getElementById('closeModal');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const goToRegister = document.getElementById('goToRegister');
const goToLogin = document.getElementById('goToLogin');

// Mesaj Kutusu Elementleri
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Kullanıcının giriş yapıp yapmadığını tutacak değişken
let userIsLoggedIn = false; // Başlangıçta kullanıcı giriş yapmamış kabul ediyoruz

// --- Yardımcı Fonksiyon: Mesajları Göster ve Biçimlendir ---
function showMessage(element, message, type) {
    if (!element) return; // Element yoksa hata vermemek için kontrol
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
        if (element) { // Element hala var mı kontrolü
            element.textContent = '';
            element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500');
        }
    }, 4000);
}

// --- Modal Açma/Kapatma ve Sekme İşlevselliği ---
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        if (authModal) authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
        if (loginMessage) loginMessage.textContent = '';
        if (registerMessage) registerMessage.textContent = '';
        if (loginTab) loginTab.click();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (authModal) authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (loginMessage) loginMessage.textContent = '';
        if (registerMessage) registerMessage.textContent = '';
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
    });
}

if (authModal) {
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            if (authModal) authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (loginMessage) loginMessage.textContent = '';
            if (registerMessage) registerMessage.textContent = '';
            if (loginForm) loginForm.reset();
            if (registerForm) registerForm.reset();
        }
    });
}

if (loginTab && registerTab && loginForm && registerForm) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        if (loginMessage) loginMessage.textContent = '';
        if (registerMessage) registerMessage.textContent = '';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        if (loginMessage) loginMessage.textContent = '';
        if (registerMessage) registerMessage.textContent = '';
    });
}

if (goToRegister && registerTab) {
    goToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        registerTab.click();
    });
}

if (goToLogin && loginTab) {
    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click();
    });
}

// --- Giriş ve Kayıt Formu Gönderimleri (PHP ile entegrasyon) ---
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            showMessage(loginMessage, 'Lütfen e-posta ve şifrenizi girin.', 'error');
            return;
        }
        showMessage(loginMessage, 'Giriş yapılıyor...', 'info');

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('login.php', { method: 'POST', body: formData });
            const data = await response.json();

            if (data.status === 'success') {
                showMessage(loginMessage, 'Giriş başarılı, yönlendiriliyorsunuz...', 'success');
                loginForm.reset();
                userIsLoggedIn = true;
                setTimeout(() => { window.location.href = 'index.php'; }, 2000);
            } else {
                showMessage(loginMessage, data.message, 'error');
                userIsLoggedIn = false;
            }
        } catch (err) {
            showMessage(loginMessage, "Bir hata oluştu, lütfen tekrar deneyin.", 'error');
            console.error('Login Hatası:', err);
            userIsLoggedIn = false;
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const confirmPassword = document.getElementById('registerConfirm').value.trim();

        if (!name || !email || !password || !confirmPassword) {
            showMessage(registerMessage, 'Lütfen tüm alanları doldurun.', 'error');
            return;
        }
        if (password.length < 6) {
            showMessage(registerMessage, 'Şifre en az 6 karakter olmalıdır.', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showMessage(registerMessage, 'Şifreler eşleşmiyor.', 'error');
            return;
        }
        showMessage(registerMessage, 'Hesap oluşturuluyor...', 'info');

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm', confirmPassword);

            const response = await fetch('register.php', { method: 'POST', body: formData });
            const data = await response.json();

            if (data.status === 'success') {
                showMessage(registerMessage, data.message, 'success');
                registerForm.reset();
                setTimeout(() => { if (loginTab) loginTab.click(); }, 2000);
            } else {
                showMessage(registerMessage, data.message, 'error');
            }
        } catch (err) {
            showMessage(registerMessage, "Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin.", 'error');
            console.error('Kayıt Hatası:', err);
        }
    });
}


// --- DOMContentLoaded: Sayfa tamamen yüklendiğinde çalışacak kodlar ---
document.addEventListener('DOMContentLoaded', function () {
    // Ziyaretçi Sayacı
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement) {
        let count = sessionStorage.getItem('siteVisitorCount');
        if (!count) {
            count = Math.floor(Math.random() * 1000) + 5000;
        } else {
            count = parseInt(count);
        }
        count++;
        sessionStorage.setItem('siteVisitorCount', count);

        let current = 0;
        const increment = Math.ceil(count / 100);

        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            visitorCountElement.textContent = current.toLocaleString();
        }, 20);
    }

    // Sepet Sayacını Başlangıçta Yükle
    updateCartCountDisplay(); // Fonksiyon çağrısı
});


// --- Sepet İşlevselliği ---

// Sepet sayacını güncelleme fonksiyonu (Header'daki sepet ikonu için)
function updateCartCountDisplay() {
    const cartItemCountElement = document.getElementById('cartItemCount');
    if (cartItemCountElement) {
        let cart = JSON.parse(sessionStorage.getItem('cartItems')) || []; // DİKKAT: 'cart' yerine 'cartItems' kullanıldı
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCountElement.textContent = totalItems;
    }
}

// Sepete Ekle Butonları İşleyicisi (index.html'deki ürün kartları için)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.classList.contains('added')) return;

        const originalText = this.textContent;
        this.textContent = "Sepete Eklendi!";
        this.classList.add('added');

        const productId = this.dataset.productId;
        const productName = this.dataset.productName;
        const productPriceText = this.dataset.productPrice;

        const productPrice = parsePrice(productPriceText);

        if (productPrice <= 0) {
            alert('Ürün fiyatı okunamadı, sepete eklenemedi.');
            this.textContent = originalText;
            this.classList.remove('added');
            return;
        }

        const productImage = this.dataset.productImage;

        let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        const existingItemIndex = cart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        sessionStorage.setItem('cartItems', JSON.stringify(cart));
        updateCartCountDisplay();

        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('added');
        }, 2000);
    });
});

// --- Haber Bülteni Formu İşleyicisi ---
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            alert(`Bültenimize abone olduğunuz için teşekkürler! ${emailInput.value}`);
            emailInput.value = '';
        } else {
            alert('Lütfen geçerli bir e-posta adresi girin.');
        }
    });
}

// --- Hızlı Görüntüleme (Quick View) İşleyicisi ---
const quickViewElements = document.querySelectorAll('.quick-view');
quickViewElements.forEach(el => {
    el.addEventListener('click', function () {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        alert(`${productName} ürününü detaylı incelemek için yakında açılacak olan ürün sayfasını kullanabilirsiniz!`);
    });
});

// --- FAVORİ İKONU TIKLAMA İŞLEVSELLİĞİ ---
const favoriteIcons = document.querySelectorAll('.favorite-icon');
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("Favori ikonuna tıklandı!");

        if (!userIsLoggedIn) {
            if (authModal) authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if (loginTab) loginTab.click();
            showMessage(loginMessage, 'Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.', 'error');
        } else {
            const productId = this.dataset.productId;
            console.log(`Ürün ID ${productId} favorilere eklendi/kaldırıldı (Kullanıcı giriş yapmış).`);
            this.classList.toggle('text-red-500');
        }
    });
});


// --- MARKET.HTML İÇİN ÖZEL İŞLEVLER (Sepet Listeleme ve Ödeme) ---

// Ödeme modalı elementleri
const checkoutButton = document.getElementById('checkoutButton');
const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const paymentForm = document.getElementById('paymentForm');
const paymentMessage = document.getElementById('paymentMessage');

// Ödeme modalını açma
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        if (paymentModal) paymentModal.style.display = 'flex';
    });
}

// Ödeme modalını kapatma
if (closePaymentModal) {
    closePaymentModal.addEventListener('click', () => {
        if (paymentModal) paymentModal.style.display = 'none';
        if (paymentMessage) paymentMessage.style.display = 'none';
    });
}

// Ödeme formu submit işlemi
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Ödeme Formu Gönderildi');

        if (paymentMessage) {
            paymentMessage.textContent = 'Ödemeniz başarıyla alındı! Teşekkür ederiz.';
            paymentMessage.style.color = 'green';
            paymentMessage.style.display = 'block';
        }

        // Sepeti boşalt
        sessionStorage.removeItem('cartItems'); // DİKKAT: 'cart' yerine 'cartItems' kullanıldı
        updateCartDisplay(); // Market sayfasında sepeti güncelle (boşaltılmış haliyle)
        updateCartCountDisplay(); // Header'daki sepet sayısını güncelle (sıfırla)

        setTimeout(() => {
            if (paymentModal) paymentModal.style.display = 'none';
            if (paymentForm) paymentForm.reset();
            if (paymentMessage) paymentMessage.style.display = 'none';
        }, 3000);
    });
}

// Market sayfasındaki sepeti dinamik olarak doldurma fonksiyonu
// KONSOLDAKİ HATANIN KAYNAĞI BÜYÜK OLASILIKLA BURASIYDI VE ŞİMDİ DÜZELTİLDİ
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (!cartItemsContainer || !cartTotalElement) {
        // Bu elementler market.html'de yoksa veya id'leri yanlışsa, fonksiyonu durdur.
        // Hatanın oluşmaması için önemli kontrol.
        console.warn("Market sayfasındaki 'cartItems' veya 'cartTotal' elementleri bulunamadı. Sepet listelenemiyor.");
        return;
    }

    let cart = JSON.parse(sessionStorage.getItem('cartItems')) || []; // DİKKAT: 'cart' yerine 'cartItems' kullanıldı
    cartItemsContainer.innerHTML = ''; // Önceki içeriği temizle
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-600 mt-4">Sepetinizde ürün bulunmamaktadır.</p>';
        cartTotalElement.textContent = '₺0.00';
        return;
    }

    cart.forEach((item, index) => {
        // item.price'ın sayı olduğundan emin ol ve toFixed kullan
        const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price);

        // Eğer hala NaN ise (önceki parseFloat işlemi başarısız olduysa)
        if (isNaN(itemPrice)) {
            console.error(`Hata: Sepetteki ürün (${item.name}) için geçersiz fiyat:`, item.price);
            // Bu öğeyi atla veya varsayılan bir değerle devam et
            return;
        }

        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'justify-between', 'items-center', 'bg-white', 'p-4', 'rounded-lg', 'shadow-sm', 'mb-3');
        itemElement.innerHTML = `
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600">Fiyat: ₺${itemPrice.toFixed(2)}</p>
                <div class="flex items-center mt-1">
                    <button class="quantity-btn bg-gray-200 text-gray-700 px-2 py-1 rounded-l" data-index="${index}" data-action="decrease">-</button>
                    <span class="px-3 py-1 bg-gray-100">${item.quantity}</span>
                    <button class="quantity-btn bg-gray-200 text-gray-700 px-2 py-1 rounded-r" data-index="${index}" data-action="increase">+</button>
                </div>
            </div>
            <button class="remove-from-cart text-red-500 hover:text-red-700 font-bold" data-index="${index}">Kaldır</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += itemPrice * item.quantity; // Toplam hesaplamasında da düzeltilmiş fiyatı kullan
    });

    cartTotalElement.textContent = `₺${total.toFixed(2)}`;

    // Miktar değiştirme ve kaldırma butonları için event listener'ları yeniden ekle
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const action = e.target.dataset.action;
            let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            if (action === 'increase') {
                cart[index].quantity++;
            } else if (action === 'decrease') {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                }
            }
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCountDisplay();
        });
    });

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            cart.splice(index, 1);
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCountDisplay();
            alert('Ürün sepetten kaldırıldı.');
        });
    });
}

// Market sayfası yüklendiğinde sepeti göster (Sadece market.html'de iken çalışır)
if (window.location.pathname.includes('market.html')) {
    document.addEventListener('DOMContentLoaded', updateCartDisplay);
}



