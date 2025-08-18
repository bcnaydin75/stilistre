// kids.js (men.js de olabilir) dosyasındaki global fonksiyonlar product-detail.js'ye kopyalanacak
// VEYA index.js'deki fonksiyonlar global olarak kullanılacaksa, burada tekrar tanımlanmasına gerek yok.
// Amaç, tüm sayfaların ortak JS kodlarını (login modal, sepet rozeti vb.) kullanmasıdır.
// Bu yüzden, index.js'deki tüm fonksiyonları buraya kopyalamak yerine, index.js'i bu sayfada da çağırdık.

// Ancak, sepet rozeti ve favori rozetini DOM'dan alma işlemleri product-detail.js'de tekrar yapılmalı
// Çünkü bu dosya ayrı bir HTML sayfasında çalışıyor ve DOM'a kendi erişimi olmalı.

// Modal ve Formlar DOM Elementleri (index.js'dekiyle aynı, bu sayfanın da kullanabilmesi için)
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
const favoriteBadge = document.querySelector('header .fa-heart').nextElementSibling; // Favori rozeti span'ı

// Favori Giriş Modalı Elementleri (index.js'dekiyle aynı)
const favoriteLoginModal = document.getElementById('favoriteLoginModal');
const closeFavoriteModal = document.getElementById('closeFavoriteModal');
const favoriteGoToLogin = document.getElementById('favoriteGoToLogin');
const favoriteGoToRegister = document.getElementById('favoriteGoToRegister');

// Mesaj Kutusu Elementleri (index.js'dekiyle aynı)
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Yardımcı Fonksiyon: Mesajları Göster ve Biçimlendir (index.js'dekiyle aynı)
function showMessage(element, message, type) {
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

// Ana Giriş/Kayıt Modal Açma Olayı (index.js'dekiyle aynı)
if (profileBtn) { // profileBtn'in varlığını kontrol et
    profileBtn.addEventListener('click', () => {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

// Ana Giriş/Kayıt Modal Kapatma Olayı (index.js'dekiyle aynı)
if (closeModal) {
    closeModal.addEventListener('click', () => {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginMessage.textContent = '';
        registerMessage.textContent = '';
        loginForm.reset();
        registerForm.reset();
    });
}

// Ana Giriş/Kayıt Modal Dışına Tıklayınca Kapatma Olayı (index.js'dekiyle aynı)
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginMessage.textContent = '';
        registerMessage.textContent = '';
        loginForm.reset();
        registerForm.reset();
    }
});

// Favori Giriş Modal Kapatma Olayı (index.js'dekiyle aynı)
if (closeFavoriteModal) {
    closeFavoriteModal.addEventListener('click', () => {
        favoriteLoginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Favori Giriş Modal Dışına Tıklayınca Kapatma Olayı (index.js'dekiyle aynı)
window.addEventListener('click', (e) => {
    if (e.target === favoriteLoginModal && favoriteLoginModal) {
        favoriteLoginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Giriş ve Kayıt Sekmeleri Arası Geçişler (index.js'dekiyle aynı)
if (loginTab) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    });
}

if (registerTab) {
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    });
}

// 'Hemen Kayıt Ol' Linki (index.js'dekiyle aynı)
if (goToRegister) {
    goToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        registerTab.click();
    });
}

// 'Zaten Hesabım Var' Linki (index.js'dekiyle aynı)
if (goToLogin) {
    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click();
    });
}

// Favori modalındaki Giriş Yap butonu (index.js'dekiyle aynı)
if (favoriteGoToLogin) {
    favoriteGoToLogin.addEventListener('click', () => {
        if (favoriteLoginModal) favoriteLoginModal.style.display = 'none';
        authModal.style.display = 'flex';
        loginTab.click();
        document.body.style.overflow = 'hidden';
    });
}

// Favori modalındaki Kayıt Ol butonu (index.js'dekiyle aynı)
if (favoriteGoToRegister) {
    favoriteGoToRegister.addEventListener('click', () => {
        if (favoriteLoginModal) favoriteLoginModal.style.display = 'none';
        authModal.style.display = 'flex';
        registerTab.click();
        document.body.style.overflow = 'hidden';
    });
}

// Giriş Formu Gönderimi İşleyicisi (index.js'dekiyle aynı)
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
            showMessage(loginMessage, "Bir hata oluştu, lütfen tekrar deneyin.", 'error');
            console.error('Login Hatası:', err);
        }
    });
}

// Kayıt Formu Gönderimi İşleyicisi (index.js'dekiyle aynı)
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
            showMessage(registerMessage, "Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin.", 'error');
            console.error('Kayıt Hatası:', err);
        }
    });
}

// Sepete ürün ekleme veya miktarını artırma fonksiyonu (index.js'dekiyle aynı)
function addToCart(product) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cartItems[existingProductIndex].quantity += product.quantity; // Miktarı eklenen miktar kadar artır
    } else {
        cartItems.push(product);
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Sepet rozetini güncelleme fonksiyonu (index.js'dekiyle aynı)
function updateCartBadge() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) { // cartBadge'in varlığını kontrol et
        cartBadge.textContent = totalQuantity;
    }
}

// Sayfa yüklendiğinde sepet sayısını sessionStorage'dan al, yoksa 0 yap (index.js'dekiyle aynı)
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    if (favoriteBadge) {
        favoriteBadge.remove(); // Favori rozetini kaldır (eğer göstermek istemiyorsanız)
    }
    loadProductDetails(); // Ürün detaylarını yükle
});

// Favori ikonları işleyicisi (Kalp ikonuna tıklayınca giriş/kayıt modalını açma)
// Bu kısım product-detail.html'deki favori butonu için özelleştirilebilir.
const favoriteIcons = document.querySelectorAll('.favorite-icon'); // Burası product-card'lardaki ikonlar için
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        if (favoriteLoginModal) {
            favoriteLoginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            favoriteLoginModal.querySelector('.modal-body p').textContent = 'Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.';
        } else {
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            loginTab.click();
            showMessage(loginMessage, 'Favorilere ürün eklemek için lütfen giriş yapın.', 'info');
        }
    });
});


// product-detail.js'ye özel kısımlar

// Geri dönme fonksiyonu
function goBack() {
    window.history.back(); // Önceki sayfaya geri döner
}

// Ürün detaylarını yükleme fonksiyonu
function loadProductDetails() {
    const selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        document.getElementById('detailProductImage').src = selectedProduct.image;
        document.getElementById('detailProductImage').alt = selectedProduct.name;
        document.getElementById('detailProductName').textContent = selectedProduct.name;
        document.getElementById('detailProductCategory').textContent = selectedProduct.category;
        document.getElementById('detailCurrentPrice').textContent = selectedProduct.currentPrice;
        document.getElementById('detailOldPrice').textContent = selectedProduct.oldPrice;
        document.getElementById('detailProductDescription').textContent = selectedProduct.description;

        // Beden seçeneklerini doldur
        const productSizeSelect = document.getElementById('productSize');
        productSizeSelect.innerHTML = '<option value="">Seçiniz</option>'; // İlk seçeneği sıfırla
        if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
            selectedProduct.sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                productSizeSelect.appendChild(option);
            });
        } else {
            // Eğer beden yoksa, beden seçimini gizle veya uygun bir mesaj göster
            productSizeSelect.closest('.size-selection').style.display = 'none';
        }

        // Sepete Ekle butonuna ürün ID'sini ekle
        const addToCartDetailBtn = document.getElementById('addToCartDetail');
        addToCartDetailBtn.setAttribute('data-product-id', selectedProduct.id);
        addToCartDetailBtn.setAttribute('data-product-name', selectedProduct.name);
        addToCartDetailBtn.setAttribute('data-product-price', parseFloat(selectedProduct.currentPrice.replace('₺', '').replace(',', '.')));
        addToCartDetailBtn.setAttribute('data-product-image', selectedProduct.image);

        // Favorilere Ekle butonuna ürün ID'sini ekle
        const addToFavoritesDetailBtn = document.getElementById('addToFavoritesDetail');
        addToFavoritesDetailBtn.setAttribute('data-product-id', selectedProduct.id);
        addToFavoritesDetailBtn.setAttribute('data-product-name', selectedProduct.name); // Favoriler için de isim gerekebilir
        addToFavoritesDetailBtn.setAttribute('data-product-image', selectedProduct.image); // Favoriler için de resim gerekebilir

    } else {
        // Eğer sessionStorage'da ürün yoksa, ana sayfaya yönlendir veya bir hata mesajı göster
        document.getElementById('productDetailContent').innerHTML = '<p style="text-align:center; font-size:20px; color:red;">Ürün bilgileri bulunamadı. Lütfen ana sayfadan bir ürün seçin.</p>';
        // Opsiyonel: setTimeout(() => window.location.href = 'index.html', 3000);
    }
}

// Miktar kontrolü
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');
const productQuantityInput = document.getElementById('productQuantity');

if (decreaseQuantityBtn) {
    decreaseQuantityBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(productQuantityInput.value);
        if (currentQuantity > 1) {
            productQuantityInput.value = currentQuantity - 1;
        }
    });
}

if (increaseQuantityBtn) {
    increaseQuantityBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(productQuantityInput.value);
        productQuantityInput.value = currentQuantity + 1;
    });
}

// Sepete Ekle buton işleyicisi (detay sayfasında)
const addToCartDetailBtn = document.getElementById('addToCartDetail');
if (addToCartDetailBtn) {
    addToCartDetailBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const selectedSize = document.getElementById('productSize').value;
        const sizeWarning = document.getElementById('sizeWarning');

        if (document.getElementById('productSize').closest('.size-selection').style.display !== 'none' && !selectedSize) {
            sizeWarning.style.display = 'block';
            return;
        } else {
            sizeWarning.style.display = 'none';
        }

        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = parseFloat(this.getAttribute('data-product-price'));
        const productImage = this.getAttribute('data-product-image');
        const quantity = parseInt(productQuantityInput.value);

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity,
            size: selectedSize // Seçilen bedeni de ekliyoruz
        };

        addToCart(product); // Ürünü sepete ekle veya miktarını artır
        updateCartBadge(); // Sepet rozetini güncelle

        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Sepete Eklendi!';
        this.style.backgroundColor = '#5cb85c'; // Başarılı renk

        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = ''; // Orijinal rengine dön
        }, 2000);
    });
}


// Favorilere Ekle buton işleyicisi (detay sayfasında)
const addToFavoritesDetailBtn = document.getElementById('addToFavoritesDetail');
if (addToFavoritesDetailBtn) {
    addToFavoritesDetailBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Buraya favorilere ekleme mantığı gelecek.
        // Genellikle kullanıcının giriş yapmış olması gerekir.
        // Eğer giriş yapmadıysa favori modalını aç.
        // Eğer giriş yaptıysa, ürünü favorilere ekle (örneğin sessionStorage veya bir API'ye istek ile).

        const currentUser = sessionStorage.getItem('loggedInUser'); // Örnek olarak kullanıcı girişini kontrol etme

        if (!currentUser) {
            // Kullanıcı giriş yapmamışsa, favori modalını aç
            if (favoriteLoginModal) {
                favoriteLoginModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                favoriteLoginModal.querySelector('.modal-body p').textContent = 'Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.';
            } else {
                authModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                loginTab.click();
                showMessage(loginMessage, 'Favorilere ürün eklemek için lütfen giriş yapın.', 'info');
            }
        } else {
            // Kullanıcı giriş yapmışsa, ürünü favorilere ekle
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const productImage = this.getAttribute('data-product-image');

            let favoriteItems = JSON.parse(sessionStorage.getItem('favoriteItems')) || [];

            const existingFavoriteIndex = favoriteItems.findIndex(item => item.id === productId);

            if (existingFavoriteIndex === -1) { // Ürün zaten favorilerde yoksa ekle
                favoriteItems.push({
                    id: productId,
                    name: productName,
                    image: productImage
                });
                sessionStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));

                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-heart"></i> Favorilere Eklendi!';
                this.style.backgroundColor = '#ff69b4'; // Pembe renk
                this.style.color = 'white'; // Yazı rengi
                this.style.border = 'none';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                    this.style.border = '2px solid var(--primary)';
                }, 2000);

                console.log(`Ürün ${productName} favorilere eklendi.`);
            } else {
                // Ürün zaten favorilerde varsa bilgilendir
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-info-circle"></i> Zaten Favorilerde!';
                this.style.backgroundColor = '#f0ad4e'; // Turuncu renk
                this.style.color = 'white'; // Yazı rengi
                this.style.border = 'none';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                    this.style.border = '2px solid var(--primary)';
                }, 2000);
                console.log(`Ürün ${productName} zaten favorilerinizde.`);
            }
        }
    });
}