<?php
session_start();
?>

<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ayakkabı Ürünleri - Stilistre</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="Style/shoe.css"> <style>
        /* CSS for the profile dropdown (can be moved to shoe.css) */
        /* Eğer profile dropdown için özel CSS'iniz varsa buraya veya shoe.css'e ekleyin */
        .profile-dropdown-wrapper {
            position: relative;
            display: inline-block; /* Buton ve dropdown'ı yan yana tutmak için */
        }

        #profileDropdown {
            display: none; /* Varsayılan olarak gizli */
            position: absolute;
            background-color: #f9f9f9;
            min-width: 170px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            right: 0; /* Dropdown'ı profile butonunun sağına hizala */
            border-radius: 5px;
            overflow: hidden; /* Kenarları yuvarlamak için */
            margin-top: 10px; /* Buton ile arasında boşluk bırak */
        }

        #profileDropdown a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }

        #profileDropdown a:hover {
            background-color: #ddd;
        }
    </style>
</head>

<body>
    <header>
        <div class="container">
            <div class="header-top">
                <div class="logo">
                    <h1>STİL<span>İSTRE</span></h1>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Aradığınız ürünü buraya yazın...">
                    <button><i class="fas fa-search"></i> Ara</button>
                </div>
                <div class="header-icons">
                    <div class="profile-dropdown-wrapper">
                        <button class="icon-btn" id="profileBtn">
                            <i class="fas fa-user"></i>
                        </button>

                        <?php if (isset($_SESSION['user'])): ?>
                            <div id="profileDropdown">
                                <div style="padding: 10px 15px; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">
                                    <span id="dropdownUsername">
                                        <?= htmlspecialchars($_SESSION['user']['username'] ?? 'Kullanıcı') ?>
                                    </span>
                                </div>
                                <a href="ayarlar.php">Ayarlar</a>
                                <a href="logout.php">Çıkış Yap</a>
                            </div>
                        <?php endif; ?>
                    </div>

                    <button class="icon-btn" onclick="window.location.href='favorites.html'">
                        <i class="fas fa-heart"></i>
                        <span class="icon-badge">3</span>
                    </button>
                    <button class="icon-btn" onclick="window.location.href='market.html'">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="icon-badge">5</span>
                    </button>
                </div>
            </div>
        </div>

        <nav>
            <div class="container">
                <ul>
                    <li><a href="index.php"><i class="fas fa-home"></i> Anasayfa</a></li>
                    <li><a href="women.php">Kadın</a></li>
                    <li><a href="male.php">Erkek</a></li>
                    <li><a href="kids.php">Çocuk</a></li>
                    <li><a href="shoe.php" class="active">Ayakkabı</a></li> </ul>
            </div>
        </nav>
    </header>

    <section class="products-section">
        <div class="container">
            <div class="section-title">
                <h1>Ayakkabı Ürünleri</h1>
            </div>

            <div class="products-grid">
                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1542291026-78cc75701539?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Erkek Spor Ayakkabı">
                        <span class="product-badge">Yeni</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Erkek Spor Ayakkabı</h3>
                        <div class="price">
                            <div class="current">₺799.99</div>
                            <div class="old">₺999.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1596752702755-d41c1fb3a23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Kadın Topuklu Ayakkabı">
                        <span class="product-badge">%30 İndirim</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Kadın Topuklu Ayakkabı</h3>
                        <div class="price">
                            <div class="current">₺449.99</div>
                            <div class="old">₺649.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Çocuk Sandalet">
                        <span class="product-badge">Popüler</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Çocuk Sandalet</h3>
                        <div class="price">
                            <div class="current">₺229.99</div>
                            <div class="old">₺299.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Kadın Babet">
                        <span class="product-badge">Fırsat</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Rahat Kadın Babet</h3>
                        <div class="price">
                            <div class="current">₺189.99</div>
                            <div class="old">₺249.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Erkek Klasik Ayakkabı">
                        <span class="product-badge">Yeni</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Erkek Klasik Ayakkabı</h3>
                        <div class="price">
                            <div class="current">₺699.99</div>
                            <div class="old">₺899.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1591369822091-8b8c0a1b0d6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Kadın Sneaker">
                        <span class="product-badge">%20 İndirim</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Trend Kadın Sneaker</h3>
                        <div class="price">
                            <div class="current">₺549.99</div>
                            <div class="old">₺699.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1609505848912-d7d687d5b3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Çocuk Bot">
                        <span class="product-badge">Kış Özel</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Su Geçirmez Çocuk Botu</h3>
                        <div class="price">
                            <div class="current">₺399.99</div>
                            <div class="old">₺529.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <h3>STİLİSTRE</h3>
                    <p>Türkiye'nin en trend giyim ürünleri tek platformda. Kalite ve uygun fiyat garantisi!</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>

                <div class="footer-col">
                    <h3>Kategoriler</h3>
                    <ul>
                        <li><a href="women.php">Kadın Giyim</a></li>
                        <li><a href="male.php">Erkek Giyim</a></li>
                        <li><a href="kids.php">Çocuk Giyim</a></li>
                        <li><a href="shoe.php">Ayakkabı</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>Müşteri Hizmetleri</h3>
                    <ul>
                        <li><a href="#">Sipariş Takibi</a></li>
                        <li><a href="#">İade ve Değişim</a></li>
                        <li><a href="#">Teslimat Bilgileri</a></li>
                        <li><a href="#">Sıkça Sorulan Sorular</a></li>
                        <li><a href="#">Gizlilik Politikası</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>İletişim</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> İstanbul, Türkiye</li>
                        <li><i class="fas fa-phone"></i> +90 212 123 4567</li>
                        <li><i class="fas fa-envelope"></i> info@stilistre.com</li>
                        <li><i class="fas fa-clock"></i> 09:00 - 18:00</li>
                    </ul>
                </div>
            </div>

            <div class="copyright">
                <p>&copy; 2025 Stilistre. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const profileBtn = document.getElementById('profileBtn');
            const profileDropdown = document.getElementById('profileDropdown');

            // Toggle dropdown
            profileBtn.addEventListener('click', function() {
                // Sadece profilDropdown varsa işlem yap
                if (profileDropdown) {
                    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
                }
                // Kullanıcı giriş yapmamışsa (profileDropdown yoksa) bir şey olmasın.
            });

            // Close dropdown when clicking outside (only if dropdown is open)
            document.addEventListener('click', function(event) {
                if (profileDropdown && profileDropdown.style.display === 'block' && !profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
                    profileDropdown.style.display = 'none';
                }
            });
        });
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
</body>

</html>