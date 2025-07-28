document.addEventListener('DOMContentLoaded', () => {
    // --- Header ve Sepet İkonu Elementleri ---
    // Sepet ikonu üzerindeki sayı için kullanılan element
    const cartItemCount = document.querySelector('.header-icons .icon-badge'); 

    // --- Auth Modal Yönetimi ---
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModal');
    const profileBtn = document.getElementById('profileBtn');
    const loginTabBtn = document.getElementById('loginTab');
    const registerTabBtn = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const goToRegisterLink = document.getElementById('goToRegister');
    const goToLoginLink = document.getElementById('goToLogin');
    const loginMessageDiv = document.getElementById('loginMessage');
    const registerMessageDiv = document.getElementById('registerMessage');

    // --- Favoriler Sayfasına Özel İçerik Yönetimi İçin Elementler ---
    const favoritesEmptyMessage = document.querySelector('.favorites-empty-message');
    const favoritesProductsContainer = document.querySelector('.favorites-products');
    const loginRegisterBtnFavorites = document.getElementById('loginRegisterBtn');

    // --- Sepet Fonksiyonları (Session Storage ile etkileşim) ---
    function getCartItems() {
        const cart = sessionStorage.getItem('cartItems');
        if (!cart) return [];
        try {
            return JSON.parse(cart).map(item => ({
                ...item,
                id: typeof item.id === 'string' && !isNaN(Number(item.id)) ? Number(item.id) : item.id,
                price: parseFloat(item.price),
                quantity: Number(item.quantity)
            }));
        } catch (e) {
            console.error("Sepet verileri parse edilirken hata oluştu:", e);
            return [];
        }
    }

    function saveCartItems(cartItems) {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartBadge(); // Sepet değiştiğinde rozeti güncelle
    }

    // Market ikonu üzerindeki sepet sayısını güncelle
    function updateCartBadge() {
        const cartItems = getCartItems();
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartItemCount) { // cartItemCount elementinin varlığını kontrol et
            cartItemCount.textContent = totalQuantity;
        }
    }

    // --- Auth Modal Genel Fonksiyonları ---
    function openAuthModal() {
        if (authModal) {
            authModal.style.display = 'flex';
        }
    }

    function closeAuthModal() {
        if (authModal) {
            authModal.style.display = 'none';
            // Mesajları kapatırken sıfırlama
            if (loginMessageDiv) {
                loginMessageDiv.innerHTML = '';
                loginMessageDiv.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'mt-3', 'text-center', 'text-lg', 'font-semibold');
            }
            if (registerMessageDiv) {
                registerMessageDiv.innerHTML = '';
                registerMessageDiv.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'mt-3', 'text-center', 'text-lg', 'font-semibold');
            }
        }
    }

    // --- Yardımcı Fonksiyon: Mesajları Göster ve Biçimlendir ---
    function showMessage(element, message, type) {
        if (!element) return; // Element yoksa hata vermeden çık

        element.textContent = message;
        // Mevcut renk ve stil sınıflarını kaldır, yeni sınıfları ekle
        element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'hidden');
        element.classList.add('mt-3', 'text-center', 'text-lg', 'font-semibold'); // Genel stiller

        if (type === 'success') {
            element.classList.add('text-green-500');
        } else if (type === 'error') {
            element.classList.add('text-red-500');
        } else if (type === 'info') {
            element.classList.add('text-yellow-500');
        }

        // Başarılı mesajı dışında kalanları 4 saniye sonra temizle
        if (type !== 'success') {
            setTimeout(() => {
                element.textContent = '';
                element.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500', 'mt-3', 'text-center', 'text-lg', 'font-semibold');
            }, 4000);
        }
    }

    // --- Event Listeners ---
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            openAuthModal();
            loginTabBtn.click(); // Profil butonuna tıklayınca varsayılan olarak giriş sekmesini aç
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeAuthModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === authModal) {
            closeAuthModal();
        }
    });

    if (loginTabBtn && registerTabBtn && loginForm && registerForm) {
        loginTabBtn.addEventListener('click', () => {
            loginTabBtn.classList.add('active');
            registerTabBtn.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            closeAuthModal(); // Her tab geçişinde mesajları temizle
            openAuthModal(); // Sonra tekrar aç (gerekiyorsa)
            // Bu kısım modal kapanıp açıldığı için temizleniyor, ekstra bir clear'a gerek kalmaz
            // Ancak yine de manuel temizleme eklenebilir:
            if (loginMessageDiv) loginMessageDiv.innerHTML = '';
            if (registerMessageDiv) registerMessageDiv.innerHTML = '';
        });

        registerTabBtn.addEventListener('click', () => {
            registerTabBtn.classList.add('active');
            loginTabBtn.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            closeAuthModal(); // Her tab geçişinde mesajları temizle
            openAuthModal(); // Sonra tekrar aç (gerekiyorsa)
            // Bu kısım modal kapanıp açıldığı için temizleniyor, ekstra bir clear'a gerek kalmaz
            // Ancak yine de manuel temizleme eklenebilir:
            if (loginMessageDiv) loginMessageDiv.innerHTML = '';
            if (registerMessageDiv) registerMessageDiv.innerHTML = '';
        });

        if (goToRegisterLink) {
            goToRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                registerTabBtn.click();
            });
        }

        if (goToLoginLink) {
            goToLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginTabBtn.click();
            });
        }
    }

    // --- Favoriler Sayfasına Özel İçerik Yönetimi Fonksiyonları ---
    function checkLoginStatus() {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        return loggedIn;
    }

    function updateFavoritesDisplay() {
        const loggedIn = checkLoginStatus();
        const hasFavoriteProducts = false; // Bu değeri PHP ile dinamik hale getirmelisiniz

        if (loggedIn) {
            if (hasFavoriteProducts) {
                favoritesEmptyMessage.style.display = 'none';
                favoritesProductsContainer.style.display = 'grid';
                if (loginRegisterBtnFavorites) {
                    loginRegisterBtnFavorites.style.display = 'none';
                }
            } else {
                favoritesEmptyMessage.style.display = 'block';
                favoritesProductsContainer.style.display = 'none';
                favoritesEmptyMessage.querySelector('p:nth-of-type(2)').innerHTML = 'Favorilerinizde henüz ürün bulunmamaktadır. Yeni ürünler keşfetmek için <a href="index.html" style="color:#007bff; text-decoration:underline;">Anasayfa</a>\'ya göz atın.';
                favoritesEmptyMessage.querySelector('p:first-of-type').style.display = 'block';
                if (loginRegisterBtnFavorites) {
                    loginRegisterBtnFavorites.style.display = 'none';
                }
            }
        } else {
            favoritesEmptyMessage.style.display = 'block';
            favoritesProductsContainer.style.display = 'none';
            favoritesEmptyMessage.querySelector('p:first-of-type').style.display = 'block';
            favoritesEmptyMessage.querySelector('p:nth-of-type(2)').innerHTML = 'Favori Ürünlerinizi Görmek Veya Yeni Ürünler Eklemek İçin Lütfen Kayıt Olun Veya Giriş Yapın';
            if (loginRegisterBtnFavorites) {
                loginRegisterBtnFavorites.style.display = 'inline-block';
            }
        }
    }

    // --- Favoriler Butonu Event Listener ---
    if (loginRegisterBtnFavorites) {
        loginRegisterBtnFavorites.addEventListener('click', () => {
            openAuthModal();
            if (loginTabBtn) {
                loginTabBtn.click();
            }
            // Favoriler sayfasından geliyorsa özel uyarı mesajı
            if (!checkLoginStatus()) {
                showMessage(loginMessageDiv, 'Favorilerinizi görmek için giriş yapmanız gerekiyor!', 'error');
            }
        });
    }

    // --- Giriş Formu (login.php ile etkileşim) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showMessage(loginMessageDiv, 'E-posta ve şifre zorunludur.', 'error');
                return;
            }

            showMessage(loginMessageDiv, 'Giriş yapılıyor...', 'info');

            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);

            try {
                const response = await fetch('login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });

                const data = await response.json();

                if (data.status === 'success') {
                    localStorage.setItem('isLoggedIn', 'true');
                    showMessage(loginMessageDiv, 'Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
                    setTimeout(() => {
                        closeAuthModal(); // Modalı kapat
                        updateFavoritesDisplay(); // Favori ekranını yeniden güncelle
                        window.location.href = 'index.php'; // Giriş başarılıysa index.php'ye yönlendir
                    }, 1000); // 1 saniye sonra yönlendir
                } else {
                    localStorage.setItem('isLoggedIn', 'false');
                    showMessage(loginMessageDiv, data.message || 'E-posta veya şifre yanlış.', 'error');
                }
            } catch (error) {
                console.error('Giriş isteği sırasında hata oluştu:', error);
                showMessage(loginMessageDiv, 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
            }
        });
    }

    // --- Kayıt Formu (register.php ile etkileşim) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirm').value;

            if (!name || !email || !password || !confirmPassword) { // !password düzeltildi
                showMessage(registerMessageDiv, 'Tüm alanlar zorunludur.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage(registerMessageDiv, 'Şifreler eşleşmiyor.', 'error');
                return;
            }

            if (password.length < 6) {
                showMessage(registerMessageDiv, 'Şifre en az 6 karakter olmalı.', 'error');
                return;
            }

            showMessage(registerMessageDiv, 'Hesap oluşturuluyor...', 'info');

            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm', confirmPassword);

            try {
                const response = await fetch('register.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });

                const data = await response.json();

                if (data.status === 'success') {
                    showMessage(registerMessageDiv, 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.', 'success');
                    setTimeout(() => {
                        if (loginTabBtn) {
                            loginTabBtn.click(); // Giriş sekmesini aktif et
                            showMessage(loginMessageDiv, 'Kaydınız başarıyla oluşturuldu. Lütfen giriş yapın.', 'success'); // Giriş formuna başarılı mesajı
                        }
                        registerForm.reset(); // Kayıt formunu sıfırla
                    }, 1000); // 1 saniye sonra yönlendir
                } else {
                    showMessage(registerMessageDiv, data.message || 'Kayıt sırasında bir hata oluştu.', 'error');
                }
            } catch (error) {
                console.error('Kayıt isteği sırasında hata oluştu:', error);
                showMessage(registerMessageDiv, 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
            }
        });
    }

    // Sayfa yüklendiğinde ve sepetle ilgili bir işlem olduğunda sayıyı güncelle
    updateCartBadge();
    updateFavoritesDisplay(); // Sayfa yüklendiğinde favori ekranını güncelle
});