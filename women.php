<?php
session_start();
?>

<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kadın Ürünleri - Stilistre</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="Style/women.css">
    <style>
        /* CSS for the profile dropdown (can be moved to women.css) */
        /* Eğer profile dropdown için özel CSS'iniz varsa buraya veya women.css'e ekleyin */
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
                    <li><a href="women.php" class="active">Kadın</a></li>
                    <li><a href="male.php">Erkek</a></li>
                    <li><a href="kids.php">Çocuk</a></li>
                    <li><a href="shoe.php">Ayakkabı</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <section class="products-section">
        <div class="container">
            <div class="section-title">
                <h1>Kadın Ürünleri</h1>
            </div>

            <div class="products-grid">
                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Yazlık Desenli Elbise">
                        <span class="product-badge">Yeni</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Yazlık Desenli Elbise</h3>
                        <div class="price">
                            <div class="current">₺349.99</div>
                            <div class="old">₺499.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="İpek Kadın Bluz">
                        <span class="product-badge">%30 İndirim</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>İpek Kadın Bluz</h3>
                        <div class="price">
                            <div class="current">₺189.99</div>
                            <div class="old">₺269.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Denim Ceket">
                        <span class="product-badge">Popüler</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Denim Ceket</h3>
                        <div class="price">
                            <div class="current">₺599.99</div>
                            <div class="old">₺799.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Kadın Spor Ayakkabı">
                        <span class="product-badge">Fırsat</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Kadın Spor Ayakkabı</h3>
                        <div class="price">
                            <div class="current">₺449.99</div>
                            <div class="old">₺699.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Midi Düz Etek">
                        <span class="product-badge">Yeni</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Midi Düz Etek</h3>
                        <div class="price">
                            <div class="current">₺249.99</div>
                            <div class="old">₺349.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1591369822091-8b8c0a1b0d6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Kot Pantolon">
                        <span class="product-badge">%25 İndirim</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Kot Pantolon</h3>
                        <div class="price">
                            <div class="current">₺299.99</div>
                            <div class="old">₺399.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1609505848912-d7d687d5b3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Deri Çapraz Çanta">
                        <span class="product-badge">Fırsat</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Deri Çapraz Çanta</h3>
                        <div class="price">
                            <div class="current">₺399.99</div>
                            <div class="old">₺549.99</div>
                        </div>
                        <button class="add-to-cart">Sepete Ekle</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Takım Elbise">
                        <span class="product-badge">Set</span>
                        <div class="quick-view">Hızlı Görünüm</div>
                    </div>
                    <div class="product-info">
                        <h3>Takım Elbise</h3>
                        <div class="price">
                            <div class="current">₺799.99</div>
                            <div class="old">₺1099.99</div>
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
                        <li><a href="male.html">Erkek Giyim</a></li>
                        <li><a href="kids.html">Çocuk Giyim</a></li>
                        <li><a href="shoe.html">Ayakkabı</a></li>
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