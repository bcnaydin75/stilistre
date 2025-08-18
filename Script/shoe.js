console.log("shoe.js dosyası başarıyla yüklendi ve çalışıyor!");

document.addEventListener('DOMContentLoaded', () => {
    // Modal ve Formlar DOM Elementleri
    const authModal = document.getElementById('authModal');
    const profileBtn = document.getElementById('profileBtn');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const goToRegister = document.getElementById('goToRegister');
    const goToLogin = document.getElementById('goToLogin');

    // Sepet rozeti ve favori ikonu
    const cartBadge = document.querySelector('.header-icons .icon-badge');
    const favIconBtn = document.getElementById('favIconBtn');

    // Mesaj Kutusu Elementleri
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // Favori ikonları (ürün kartları üzerindekiler)
    const favoriteIcons = document.querySelectorAll('.favorite-icon');

    // Sepete Ekle butonları
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Kullanıcının giriş yapıp yapmadığını tutan değişken
    let currentUser = null;

    // Sayfa yüklendiğinde sepet sayısını sessionStorage'dan al, yoksa 0 yap
    updateCartBadge();

    // Yardımcı Fonksiyon: Modalı Aç
    function openModal(modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Yardımcı Fonksiyon: Modalı Kapat
    function closeModal(modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (modal.id === 'authModal') {
            loginMessage.textContent = '';
            registerMessage.textContent = '';
            loginForm.reset();
            registerForm.reset();
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    }

    // Yardımcı Fonksiyon: Mesajları Göster ve Biçimlendir
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

    // --- Olay Dinleyicileri ---

    // Profil Butonu: Giriş/Kayıt Modalını Aç
    profileBtn.addEventListener('click', () => {
        openModal(authModal);
        loginMessage.textContent = '';
    });

    // Tüm Kapatma Butonları (x işaretleri)
    closeModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const parentModal = e.target.closest('.auth-modal');
            if (parentModal) {
                closeModal(parentModal);
            }
        });
    });

    // Modal dışına tıklayınca kapatma
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal(authModal);
        }
    });

    // Giriş ve Kayıt Sekmeleri Arası Geçişler
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

    // 'Hemen Kayıt Ol' Linki
    goToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        registerTab.click();
    });

    // 'Zaten Hesabım Var' Linki
    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click();
    });

    // Giriş Formu Gönderimi İşleyicisi
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
                
                // Kullanıcı girişini simüle et
                currentUser = {
                    id: data.userId || '123',
                    name: data.userName || email,
                    email: email
                };
                console.log('Giriş yapan kullanıcı:', currentUser);

                // Yönlendirme
                setTimeout(() => {
                    window.location.href = 'index.php'; // İstenilen yere yönlendirme
                }, 2000);
            } else {
                showMessage(loginMessage, data.message, 'error');
            }
        } catch (err) {
            showMessage(loginMessage, "Bir hata oluştu, lütfen tekrar deneyin.", 'error');
            console.error('Login Hatası:', err);
        }
    });

    // Kayıt Formu Gönderimi İşleyicisi
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
                    // Kayıt başarılıysa otomatik olarak giriş sayfasına geçsin diye click eventi tetikleniyor
                    // Giriş başarılıysa yönlendirme zaten loginForm submit handler'ında yapılacak.
                }, 2000);
            } else {
                showMessage(registerMessage, data.message, 'error');
            }
        } catch (err) {
            showMessage(registerMessage, "Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin.", 'error');
            console.error('Kayıt Hatası:', err);
        }
    });

    // Favori ikonları işleyicisi
    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            if (!currentUser) {
                openModal(authModal);
                loginTab.click();
                showMessage(loginMessage, 'Favorilere ürün eklemek için lütfen giriş yapın veya kayıt olun.', 'info');
                return;
            }

            const heartIcon = this.querySelector('i');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productId = productCard.getAttribute('data-product-id') || productName.replace(/\s/g, '-').toLowerCase();

            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
            this.classList.toggle('active');

            let favorites = JSON.parse(localStorage.getItem('userFavorites') || '{}');
            const userFavs = favorites[currentUser.id] || [];

            if (heartIcon.classList.contains('fas')) {
                if (!userFavs.includes(productId)) {
                    userFavs.push(productId);
                    showMessage(loginMessage, `${productName} favorilerinize eklendi!`, 'success');
                }
            } else {
                const index = userFavs.indexOf(productId);
                if (index > -1) {
                    userFavs.splice(index, 1);
                    showMessage(loginMessage, `${productName} favorilerinizden kaldırıldı.`, 'info');
                }
            }
            favorites[currentUser.id] = userFavs;
            localStorage.setItem('userFavorites', JSON.stringify(favorites));
            console.log(`Kullanıcı ${currentUser.name} için favoriler:`, userFavs);
        });
    });

    // Header'daki Favori İkonu Tıklaması
    if (favIconBtn) {
        favIconBtn.addEventListener('click', () => {
            window.location.href = 'favorites.html';
        });
    }

    // Sepete Ekle Butonları İşleyicisi
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

    // Sepet rozetini güncelleme fonksiyonu
    function updateCartBadge() {
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalQuantity;
        }
    }

    // Ziyaretçi Sayacı
    const visitorCounterElement = document.getElementById('visitorCount');
    if (visitorCounterElement) {
        let count = localStorage.getItem('visitorCount');
        if (!count) {
            count = Math.floor(Math.random() * 1000) + 5000;
        } else {
            count = parseInt(count);
        }

        count++;
        localStorage.setItem('visitorCount', count);

        let current = 0;
        const increment = Math.ceil(count / 100);

        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            visitorCounterElement.textContent = current.toLocaleString();
        }, 20);
    }

    // Hızlı Görüntüleme (Quick View) İşleyicisi
    const quickViewElements = document.querySelectorAll('.quick-view');
    quickViewElements.forEach(el => {
        el.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            alert(`${productName} ürününü detaylı incelemek için yakında açılacak olan ürün sayfasını kullanabilirsiniz!`);
        });
    });
});