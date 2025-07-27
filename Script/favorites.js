document.addEventListener('DOMContentLoaded', () => {
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

    function openAuthModal() {
        if (authModal) {
            authModal.style.display = 'flex';
        }
    }

    function closeAuthModal() {
        if (authModal) {
            authModal.style.display = 'none';
            // Mesajları kapatırken sıfırlama
            if (loginMessageDiv) loginMessageDiv.innerHTML = '';
            if (registerMessageDiv) registerMessageDiv.innerHTML = '';
        }
    }

    // Profil butonu tıklandığında modali aç
    if (profileBtn) {
        profileBtn.addEventListener('click', openAuthModal);
    }

    // Modal kapatma butonu tıklandığında modali kapat
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeAuthModal);
    }

    // Modal dışına tıklandığında modali kapat
    window.addEventListener('click', (event) => {
        if (event.target === authModal) {
            closeAuthModal();
        }
    });

    // Tab Geçişleri (Giriş / Kayıt Ol)
    if (loginTabBtn && registerTabBtn && loginForm && registerForm) {
        loginTabBtn.addEventListener('click', () => {
            loginTabBtn.classList.add('active');
            registerTabBtn.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            // Tab değiştiğinde mesajları temizle
            if (loginMessageDiv) loginMessageDiv.innerHTML = '';
            if (registerMessageDiv) registerMessageDiv.innerHTML = '';
        });

        registerTabBtn.addEventListener('click', () => {
            registerTabBtn.classList.add('active');
            loginTabBtn.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            // Tab değiştiğinde mesajları temizle
            if (loginMessageDiv) loginMessageDiv.innerHTML = '';
            if (registerMessageDiv) registerMessageDiv.innerHTML = '';
        });

        // Giriş formundan Kayıt Ol'a git linki
        if (goToRegisterLink) {
            goToRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                registerTabBtn.click(); // Kayıt Ol sekmesini tetikle
            });
        }

        // Kayıt formundan Giriş Yap'a git linki
        if (goToLoginLink) {
            goToLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginTabBtn.click(); // Giriş Yap sekmesini tetikle
            });
        }
    }

    // --- Favoriler Sayfasına Özel İçerik Yönetimi ---
    const favoritesEmptyMessage = document.querySelector('.favorites-empty-message');
    const favoritesProductsContainer = document.querySelector('.favorites-products');
    const loginRegisterBtnFavorites = document.getElementById('loginRegisterBtn');

    function checkLoginStatus() {
        // Bu sadece bir placeholder. Gerçek bir uygulamada sunucu taraflı oturum kontrolü yapılmalıdır.
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        return loggedIn;
    }

    function updateFavoritesDisplay() {
        const loggedIn = checkLoginStatus();
        // hasFavoriteProducts, gerçek veritabanınızdan veya API'den gelmelidir.
        // Şimdilik, sadece test amaçlı olarak varsayılan bir değer verelim.
        // Örneğin, giriş yapılmamışsa veya giriş yapılmış ama favori yoksa false.
        const hasFavoriteProducts = false; // <<< Bu değeri PHP ile dinamik hale getirmelisiniz

        if (loggedIn) {
            // Kullanıcı giriş yapmış
            if (hasFavoriteProducts) {
                // Kullanıcının favori ürünleri varsa
                favoritesEmptyMessage.style.display = 'none';
                favoritesProductsContainer.style.display = 'grid';
                if (loginRegisterBtnFavorites) {
                    loginRegisterBtnFavorites.style.display = 'none'; // Butonu gizle
                }
                console.log("Kullanıcı giriş yaptı ve favori ürünleri var, favoriler gösteriliyor.");
                // TODO: Burada favori ürünleri bir API çağrısı ile getirip favoritesProductsContainer içine ekleyin
                // Örneğin: fetchFavoriteProducts();
            } else {
                // Kullanıcı giriş yaptı ama favori ürünü yok
                favoritesEmptyMessage.style.display = 'block';
                favoritesProductsContainer.style.display = 'none';
                favoritesEmptyMessage.querySelector('p:nth-of-type(2)').innerHTML = 'Favorilerinizde henüz ürün bulunmamaktadır. Yeni ürünler keşfetmek için <a href="index.html" style="color:#007bff; text-decoration:underline;">Anasayfa</a>\'ya göz atın.';
                favoritesEmptyMessage.querySelector('p:first-of-type').style.display = 'block'; // İlk mesajı da göster
                if (loginRegisterBtnFavorites) {
                    loginRegisterBtnFavorites.style.display = 'none'; // Giriş yapmışsa butonu gizle
                }
                console.log("Kullanıcı giriş yaptı ama favori ürünleri yok, boş mesaj gösteriliyor.");
            }
        } else {
            // Kullanıcı giriş yapmadı - Tam olarak istediğiniz senaryo
            favoritesEmptyMessage.style.display = 'block';
            favoritesProductsContainer.style.display = 'none';
            // İlk mesajı göster: "Favorilerinizde henüz ürün bulunmamaktadır."
            favoritesEmptyMessage.querySelector('p:first-of-type').style.display = 'block';
            // İkinci mesajı güncelleyin: "Favori Ürünlerinizi Görmek Veya Yeni Ürünler Eklemek İçin Lütfen Kayıt Olun Veya Giriş Yapın"
            favoritesEmptyMessage.querySelector('p:nth-of-type(2)').innerHTML = 'Favori Ürünlerinizi Görmek Veya Yeni Ürünler Eklemek İçin Lütfen Kayıt Olun Veya Giriş Yapın';
            if (loginRegisterBtnFavorites) {
                loginRegisterBtnFavorites.style.display = 'inline-block'; // Butonu göster
            }
            console.log("Kullanıcı giriş yapmadı, giriş uyarısı gösteriliyor.");
        }
    }

    // Sayfa yüklendiğinde favori ekranını güncelle
    updateFavoritesDisplay();

    // Favoriler sayfasındaki "Giriş Yap / Kayıt Ol" butonuna tıklama olayı
    if (loginRegisterBtnFavorites) {
        loginRegisterBtnFavorites.addEventListener('click', () => {
            openAuthModal(); // Modalı aç
            if (loginTabBtn) {
                loginTabBtn.click(); // Giriş sekmesini aktif yap
            }
            // Giriş formunda kullanıcıya özel bir uyarı mesajı göster (sadece bu butondan gelirse)
            if (!checkLoginStatus() && loginMessageDiv) {
                loginMessageDiv.innerHTML = '<span style="color: red; font-weight: bold;">Favorilerinizi görmek için giriş yapmanız gerekiyor!</span>';
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
                loginMessageDiv.innerHTML = '<span style="color: red;">E-posta ve şifre zorunludur.</span>';
                return;
            }

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
                    loginMessageDiv.innerHTML = '<span style="color: green;">Giriş başarılı! Yönlendiriliyorsunuz...</span>';
                    setTimeout(() => {
                        closeAuthModal(); // Modalı kapat
                        updateFavoritesDisplay(); // Favori ekranını yeniden güncelle
                        window.location.href = 'index.php'; // Giriş başarılıysa index.php'ye yönlendir
                    }, 1000); // 1 saniye sonra yönlendir
                } else {
                    localStorage.setItem('isLoggedIn', 'false');
                    loginMessageDiv.innerHTML = `<span style="color: red;">${data.message || 'E-posta veya şifre yanlış.'}</span>`;
                }
            } catch (error) {
                console.error('Giriş isteği sırasında hata oluştu:', error);
                loginMessageDiv.innerHTML = '<span style="color: red;">Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</span>';
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

            if (!name || !email || !password || !confirmPassword) {
                registerMessageDiv.innerHTML = '<span style="color: red;">Tüm alanlar zorunludur.</span>';
                return;
            }

            if (password !== confirmPassword) {
                registerMessageDiv.innerHTML = '<span style="color: red;">Şifreler eşleşmiyor.</span>';
                return;
            }

            if (password.length < 6) {
                registerMessageDiv.innerHTML = '<span style="color: red;">Şifre en az 6 karakter olmalı.</span>';
                return;
            }

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
                    registerMessageDiv.innerHTML = '<span style="color: green;">Kayıt başarılı! Şimdi giriş yapabilirsiniz.</span>';
                    // Kayıt başarılı olduktan 1 saniye sonra otomatik olarak giriş sekmesine yönlendir
                    setTimeout(() => {
                        if (loginTabBtn) {
                            loginTabBtn.click(); // Giriş sekmesini aktif et
                            // Giriş formuna kayıt başarılı mesajı veya direkt favoriler uyarısı ekle
                            loginMessageDiv.innerHTML = '<span style="color: green;">Kaydınız başarıyla oluşturuldu. Lütfen giriş yapın.</span>';
                        }
                        registerForm.reset(); // Kayıt formunu sıfırla
                    }, 1000); // 1 saniye sonra yönlendir
                } else {
                    registerMessageDiv.innerHTML = `<span style="color: red;">${data.message || 'Kayıt sırasında bir hata oluştu.'}</span>`;
                }
            } catch (error) {
                console.error('Kayıt isteği sırasında hata oluştu:', error);
                registerMessageDiv.innerHTML = '<span style="color: red;">Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</span>';
            }
        });
    }
});