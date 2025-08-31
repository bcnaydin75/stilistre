console.log("male.js dosyası başarıyla yüklendi ve çalışıyor!");

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
const cartBadge = document.querySelector('.header-icons .fa-shopping-cart').nextElementSibling;
const favoriteBadge = document.querySelector('header .fa-heart').nextElementSibling;

// Mesaj kutuları
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Sayfa yüklendiğinde sepet rozeti güncelle
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    if (favoriteBadge) favoriteBadge.remove(); // Eğer favori sayısı göstermeyeceksen kaldır
});

// Mesaj gösterme fonksiyonu
function showMessage(element, message, type) {
    element.textContent = message;
    element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'hidden');
    element.classList.add('mt-3', 'text-center', 'text-lg', 'font-semibold');

    if (type === 'success') element.classList.add('text-green-500');
    else if (type === 'error') element.classList.add('text-red-500');
    else if (type === 'info') element.classList.add('text-yellow-500');

    setTimeout(() => {
        element.textContent = '';
        element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500');
    }, 4000);
}

// Modal açma/kapatma olayları
profileBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginMessage.textContent = '';
    registerMessage.textContent = '';
    loginForm.reset();
    registerForm.reset();
});

window.addEventListener('click', e => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginMessage.textContent = '';
        registerMessage.textContent = '';
        loginForm.reset();
        registerForm.reset();
    }
});

// Sekme geçişleri
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    loginMessage.textContent = '';
    registerMessage.textContent = '';
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    loginMessage.textContent = '';
    registerMessage.textContent = '';
});

goToRegister.addEventListener('click', e => {
    e.preventDefault();
    registerTab.click();
});

goToLogin.addEventListener('click', e => {
    e.preventDefault();
    loginTab.click();
});

// Giriş formu gönderimi
loginForm.addEventListener('submit', async e => {
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

        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === 'success') {
            showMessage(loginMessage, 'Giriş başarılı, yönlendiriliyorsunuz...', 'success');
            loginForm.reset();
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 2000);
        } else {
            showMessage(loginMessage, data.message, 'error');
        }
    } catch (err) {
        showMessage(loginMessage, 'Bir hata oluştu, tekrar deneyin.', 'error');
        console.error(err);
    }
});

// Kayıt formu gönderimi
registerForm.addEventListener('submit', async e => {
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
        showMessage(registerMessage, 'Şifre en az 6 karakter olmalı.', 'error');
        return;
    }
    if (password !== confirmPassword) {
        showMessage(registerMessage, 'Şifreler eşleşmiyor.', 'error');
        return;
    }

    showMessage(registerMessage, 'Kayıt oluyor...', 'info');

    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirm', confirmPassword);

        const response = await fetch('register.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === 'success') {
            showMessage(registerMessage, data.message, 'success');
            registerForm.reset();
            setTimeout(() => {
                loginTab.click();
            }, 2000);
        } else {
            showMessage(registerMessage, data.message, 'error');
        }
    } catch (err) {
        showMessage(registerMessage, 'Kayıt sırasında hata oluştu, tekrar deneyin.', 'error');
        console.error(err);
    }
});

// Sepete ekle butonları
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const productCard = this.closest('.product-card');
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

        addToCart(product);
        updateCartBadge();

        const originalText = this.textContent;
        this.textContent = "Sepete Eklendi!";
        this.style.backgroundColor = '#5cb85c';

        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
    });
});

// Sepete ürün ekleme
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

// Sepet rozeti güncelleme
function updateCartBadge() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
}

// Favori ikonları tıklanma işleyicisi
const favoriteIcons = document.querySelectorAll('.favorite-icon');
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        // Eğer giriş yoksa giriş modalı aç
        if (!sessionStorage.getItem('userLoggedIn')) {
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            loginTab.click();
            showMessage(loginMessage, 'Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.', 'error');
        } else {
            // Giriş varsa index.php'ye yönlendir
            window.location.href = 'index.php';
        }
    });
});